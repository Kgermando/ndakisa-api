import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Notify } from './models/notify.entity';
import { PaginatedResult } from 'src/common/paginated_result.interface';
import { PaginationDto } from 'src/common/paginate.dto';

@Injectable()
export class NotifyService extends AbstractService {
    constructor(
        @InjectRepository(Notify) private readonly  dataRepository: Repository<Notify>,
          @InjectDataSource() private dataSource: DataSource,
          @Inject('REQUEST') private readonly queryRunner: QueryRunner,
    ) {
        super(dataRepository); 
    }

    getCurrentDate(): Promise<any[]> {
        return this.dataSource.query(`
            SELECT date_de_rembousement, name_beneficiaire, date_paiement, "beneficiaires"."id"
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE  
            EXTRACT(YEAR FROM "date_de_rembousement" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) AND 
            EXTRACT(MONTH FROM "date_de_rembousement" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) AND
            (EXTRACT(DAY FROM "date_de_rembousement" ::TIMESTAMP) - EXTRACT(DAY FROM CURRENT_DATE ::TIMESTAMP)) >= 0 AND
            (EXTRACT(DAY FROM "date_de_rembousement" ::TIMESTAMP) - EXTRACT(DAY FROM CURRENT_DATE ::TIMESTAMP)) <= 7 AND 
            "date_paiement" ::TIMESTAMP IS NULL AND
            statut='En cours' AND is_delete=false
            ORDER BY date_de_rembousement DESC;
        `);
    }

    getNotification(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM notifications 
            WHERE "notifications"."beneficiaireId"='${id}' 
            ORDER BY created DESC;
        `);
    }

    getTotalRemboursements(id, page: number = 1): Promise<any[]> {

        return this.dataSource.query(`
            SELECT COUNT(date_de_rembousement) AS totalarembourser, COUNT(date_paiement) AS totalpayer
            FROM plan_remboursements
            WHERE "plan_remboursements"."beneficiaireId"='${id}';
        `);  
    }

    async paginatee(id, pagination: PaginationDto): Promise<any> {
        const { page, limit } = pagination;
      
        // Calculate offset based on page and limit
        const offset = (page - 1) * limit;
      
        // 1. Get total count (separate query)
        const countQuery = `SELECT COUNT(*) AS total FROM plan_remboursements`;
        const total = await this.queryRunner.query(countQuery);
      
        // 2. Get paginated data
        const dataQuery = `
            SELECT COUNT(date_de_rembousement) AS totalarembourser, 
                COUNT(date_paiement) AS totalpayer
            FROM plan_remboursements
            WHERE "plan_remboursements"."beneficiaireId"='${id}'
            LIMIT ${limit}
            OFFSET ${offset};
        `;
        const data = await this.queryRunner.query(dataQuery);
      
        return {
          data,
          total: total[0].total, // assuming the count query returns an array with total count
        };
      }


      getInsolvable(month): Promise<any[]> {
        return this.dataSource.query(`
            SELECT 
                "beneficiaires"."id", 
                "beneficiaires"."identifiant", 
                "beneficiaires"."name_beneficiaire", 
                "beneficiaires"."montant_a_debourser", 
                "beneficiaires"."statut"
            FROM plan_remboursements 
            INNER JOIN beneficiaires ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE date_de_rembousement < CURRENT_DATE - INTERVAL '${month} months'
                AND montant_payer ::FLOAT = '0' AND
                statut='En cours' AND is_delete=false
            GROUP BY "beneficiaires"."id" 
            ORDER BY "beneficiaires"."montant_a_debourser" DESC; 
        `);
    }
      

    getInsolvable1(month): Promise<any[]> {
        return this.dataSource.query(`
            SELECT "beneficiaires"."id", identifiant, name_beneficiaire, montant_a_debourser, statut
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE
                date_de_rembousement >= CURRENT_DATE - INTERVAL '${month} months' 
            AND
                montant_payer = '0' AND
                statut='En cours' AND is_delete=false
            GROUP BY "beneficiaires"."id", name_beneficiaire;


            SELECT 
                "beneficiaires"."id", 
                "beneficiaires"."identifiant", 
                "beneficiaires"."name_beneficiaire", 
                "beneficiaires"."montant_a_debourser", 
                "beneficiaires"."statut"
            FROM plan_remboursements 
            INNER JOIN beneficiaires ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE date_de_rembousement < CURRENT_DATE - INTERVAL '12 months'
            AND montant_payer ::FLOAT = '0'
            GROUP BY "beneficiaires"."id" 
            ORDER BY "beneficiaires"."montant_a_debourser" DESC;
            



            SELECT
            client.nom,
            client.prenom,
            client.adresse,
            client.telephone,
            client.email,
            SUM(facture.montant) AS montant_total,
            SUM(facture.montant_paye) AS montant_paye,
            (SUM(facture.montant) - SUM(facture.montant_paye)) AS montant_impaye,
            facture.date_echeance

            FROM client
            INNER JOIN facture ON client.id = facture.client_id
            WHERE facture.date_echeance < CURRENT_DATE - INTERVAL '6 months'
            AND (SUM(facture.montant) - SUM(facture.montant_paye)) > 0
            GROUP BY client.id
            ORDER BY montant_impaye DESC;
        `);
    }
}