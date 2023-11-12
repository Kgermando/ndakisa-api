import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor( 
        @InjectDataSource() private dataSource: DataSource,
    ) { 
    }

    async totalBeneficiaire(start_date, end_date) {
        return this.dataSource.query(`
            SELECT count(*) as total FROM beneficiaires 
            WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async totalCohorte(start_date, end_date) {
        return this.dataSource.query(`
            SELECT count(*) as total FROM cohortes 
            WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async totalBanque(start_date, end_date) {
        return this.dataSource.query(`
            SELECT count(*) as total FROM banques 
            WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async sexe(start_date, end_date) {
        return this.dataSource.query(`
            SELECT sexe, COUNT(sexe) FROM beneficiaires 
            WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY sexe;
        `);
    }

    async ageBeneficiaires(start_date, end_date) {
        return this.dataSource.query(`
            SELECT
                COUNT(case when date_part('year', age(date_naissance))>=18 AND date_part('year', age(date_naissance))<=25 then 1 end) as "De 18-25 ans",
                COUNT(case when date_part('year', age(date_naissance))>25 AND date_part('year', age(date_naissance))<=35 then 1 end) as "De 25-35 ans",
                COUNT(case when date_part('year', age(date_naissance))>35 AND date_part('year', age(date_naissance))<=45 then 1 end) as "De 35-45 ans",
                COUNT(case when date_part('year', age(date_naissance))>45 AND date_part('year', age(date_naissance))<=55 then 1 end) as "De 45-55 ans", 
                COUNT(case when date_part('year', age(date_naissance))>55 AND date_part('year', age(date_naissance))<=65 then 1 end) as "De 55-65 ans"
                FROM beneficiaires 
                WHERE created BETWEEN
                '${start_date}' ::TIMESTAMP AND
                '${end_date}' ::TIMESTAMP;
        `);
    }

    async totalGarantie(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_garantie as decimal(20,2))), 0) as montant_garantie
            FROM beneficiaires WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async totalCreditAccorde(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(credit_accorde as decimal(20,2))), 0) as credit_accorde
            FROM beneficiaires WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async totalARembourser(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(20,2))), 0) as montant_a_rembourser
            FROM beneficiaires WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async totalRembourse(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) as montant_payer
            FROM plan_remboursements WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async resteARembourse(start_date, end_date) {
        return this.dataSource.query(`
            SELECT (

                (
                    SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(20,2))), 0)
                    FROM beneficiaires WHERE created BETWEEN
                    '${start_date}' ::TIMESTAMP AND
                    '${end_date}' ::TIMESTAMP
                )

                -

                (
                    SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0)
                    FROM plan_remboursements WHERE created BETWEEN
                    '${start_date}' ::TIMESTAMP AND
                    '${end_date}' ::TIMESTAMP
                )
        
            ) AS reste_a_rembourser; 
        `);
    }

    async progressionRemboursementSexeHomme(start_date, end_date) { 
        return this.dataSource.query(`
        SELECT "beneficiaires"."sexe", COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer, to_char("plan_remboursements"."created", 'YYYY-MM-DD') as month
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "beneficiaires"."sexe"='Homme' AND "plan_remboursements"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP 
            GROUP BY "beneficiaires"."sexe", "plan_remboursements"."created"
            ORDER BY "plan_remboursements"."created"
        `);
    }
    async progressionRemboursementSexeFemme(start_date, end_date) { 
        return this.dataSource.query(`
        SELECT "beneficiaires"."sexe", COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer, to_char("plan_remboursements"."created", 'YYYY-MM-DD') as month
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "beneficiaires"."sexe"='Femme' AND "plan_remboursements"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP 
            GROUP BY "beneficiaires"."sexe", "plan_remboursements"."created"
            ORDER BY "plan_remboursements"."created"
        `);
    }
    async progressionRemboursementSexeDate(start_date, end_date) {
        return this.dataSource.query(`
        SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer, to_char("plan_remboursements"."created", 'YYYY-MM-DD') as month
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "plan_remboursements"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP 
            GROUP BY "plan_remboursements"."created"
            ORDER BY "plan_remboursements"."created"
        `);
    }

    async participationParBanque(start_date, end_date) {
       return this.dataSource.query(`
            SELECT "banques"."name_banque", COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer
                FROM plan_remboursements
                LEFT JOIN "banques" ON "banques"."id" = "plan_remboursements"."banqueId"
                WHERE "plan_remboursements"."created"
                BETWEEN
                '${start_date}' ::TIMESTAMP AND
                '${end_date}' ::TIMESTAMP
                GROUP BY "banques"."name_banque";
        `);
    }

    async statutBeneficiaires(start_date, end_date) { 
        return this.dataSource.query(`
            SELECT COALESCE("statut", LEFT('Pas de statut', 40)) AS statut, COUNT(*)
            FROM beneficiaires 
            WHERE  
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY "statut";
        `);
    }

    async tauxParticipatiionProvince(start_date, end_date) {
        return this.dataSource.query(`
            WITH resultat AS (SELECT COUNT(id) AS total FROM beneficiaires) 
            SELECT province, COUNT(province)*100/total AS pourcentage 
            FROM resultat, beneficiaires 
            WHERE created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY total, province;
        `);
    }

    // async repartitionMontantRemboursement(start_date, end_date) {}

    // total à rembourser, total remboursé, reste à rembourser
    async remboursementTotalEtReste(start_date, end_date) { 
        return this.dataSource.query(`
        SELECT COALESCE((
                SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(20,2))), 0)
                FROM beneficiaires
                WHERE "beneficiaires"."created"
                        BETWEEN
                        '${start_date}' ::TIMESTAMP AND
                        '${end_date}' ::TIMESTAMP
                )) AS total_a_rembourse,
            COALESCE((
                        SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0)
                        FROM plan_remboursements
                        WHERE "plan_remboursements"."created"
                        BETWEEN
                        '${start_date}' ::TIMESTAMP AND
                        '${end_date}' ::TIMESTAMP
                    )) AS total_rembourse, 
            COALESCE((
                        SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(20,2))), 0)
                        FROM beneficiaires
                        WHERE "beneficiaires"."created"
                        BETWEEN
                        '${start_date}' ::TIMESTAMP AND
                        '${end_date}' ::TIMESTAMP
                    )
                    -
                    (
                        SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0)
                        FROM plan_remboursements
                        WHERE "plan_remboursements"."created"
                        BETWEEN
                        '${start_date}' ::TIMESTAMP AND
                        '${end_date}' ::TIMESTAMP
                    ), 0) AS reste_a_rembourse,  
            EXTRACT(MONTH FROM "plan_remboursements"."created" ::TIMESTAMP) as month
            FROM plan_remboursements 
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "plan_remboursements"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY month; 
        `);
    }

    async remboursementCohorte(start_date, end_date) {
        return this.dataSource.query(`
            SELECT "cohortes"."name_cohorte", COUNT("beneficiaires"."id") AS beneficiaire
                FROM beneficiaires
                LEFT JOIN "cohortes" ON "cohortes"."id" = "beneficiaires"."cohorteId"
                WHERE "beneficiaires"."created"
                BETWEEN
                '${start_date}' ::TIMESTAMP AND
                '${end_date}' ::TIMESTAMP
                GROUP BY "cohortes"."name_cohorte";
        `);
    }

    async statutCohorte(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE("statut", LEFT('Pas de statut', 40)) AS statut, COUNT(*)
            FROM cohortes 
            WHERE
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY "statut";
        `);
    }

    async secteurActivite(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE("name_secteur", LEFT('Pas de secteur', 40)) AS name_secteur, COUNT(*)
            FROM beneficiaires
            LEFT JOIN "secteurs" ON "secteurs"."id" = "beneficiaires"."secteurActiviteId"
            WHERE
            "beneficiaires"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP
            GROUP BY "name_secteur";
        `);
    }
 

}
