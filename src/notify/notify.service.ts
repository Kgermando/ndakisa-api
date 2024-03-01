import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Notify } from './models/notify.entity';

@Injectable()
export class NotifyService extends AbstractService {
    constructor(
        @InjectRepository(Notify) private readonly  dataRepository: Repository<Notify>,
          @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }


    getCurrentDate1(): Promise<any[]> {
        return this.dataSource.query(`
            SELECT date_de_rembousement, name_beneficiaire, date_paiement, "beneficiaires"."id"
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE  
            (EXTRACT(DAY FROM CURRENT_DATE ::TIMESTAMP) - EXTRACT(DAY FROM "date_de_rembousement" ::TIMESTAMP)) <= 7 AND
            EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP) = EXTRACT(MONTH FROM "date_de_rembousement" ::TIMESTAMP) AND
            EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) = EXTRACT(YEAR FROM "date_de_rembousement" ::TIMESTAMP) AND 
            "date_paiement" ::TIMESTAMP IS NULL AND
            statut='En cours' AND is_delete=false
            ORDER BY date_de_rembousement DESC; 
        `);
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

    getTotalRemboursements(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT COUNT(date_de_rembousement) AS totalarembourser, COUNT(date_paiement) AS totalpayer
            FROM plan_remboursements
            WHERE "plan_remboursements"."beneficiaireId"='${id}';
        `); 
    }

    // Ceux qui ont moins ou egal a (month) mois
    getInsolvable(month): Promise<any[]> {
        return this.dataSource.query(`
            SELECT "beneficiaires"."id", identifiant, name_beneficiaire, montant_a_debourser, statut
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE
                date_de_rembousement BETWEEN CURRENT_DATE - INTERVAL '${month} months' AND CURRENT_DATE
            AND
                montant_payer = '0' AND
                statut='En cours' AND is_delete=false
            GROUP BY "beneficiaires"."id", name_beneficiaire; 
        `);
    }
}