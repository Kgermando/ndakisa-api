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


    getCurrentDate(): Promise<any[]> {
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

    getCurrentDate1(): Promise<any[]> {
        return this.dataSource.query(`
        SELECT date_de_rembousement, name_beneficiaire, date_paiement, "beneficiaires"."id"
        FROM plan_remboursements
        LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
        WHERE  
        EXTRACT(YEAR FROM "date_de_rembousement" ::TIMESTAMP) = EXTRACT(YEAR FROM CURRENT_DATE ::TIMESTAMP) AND 
        EXTRACT(MONTH FROM "date_de_rembousement" ::TIMESTAMP) = EXTRACT(MONTH FROM CURRENT_DATE ::TIMESTAMP)AND
        (EXTRACT(DAY FROM "date_de_rembousement" ::TIMESTAMP) - EXTRACT(DAY FROM CURRENT_DATE ::TIMESTAMP)) > 0 AND
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
            WHERE "notifications"."beneficiaireId"='${id}'; 
        `); 
    }

    getTotalRemboursements(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT COUNT(date_de_rembousement) AS date_de_rembousement, COUNT(date_paiement) AS date_paiement
            FROM plan_remboursements
            WHERE "plan_remboursements"."beneficiaireId"='${id}';
        `); 
    }
}

