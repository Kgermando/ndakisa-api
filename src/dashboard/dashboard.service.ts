import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor( 
        @InjectDataSource() private dataSource: DataSource,
    ) { 
    }

    async totalBeneficiaire() {
        return this.dataSource.query(`
            SELECT count(*) as total FROM beneficiaires;
        `);
    }

    async totalCohorte() {
        return this.dataSource.query(`
            SELECT count(*) as total FROM cohortes;
        `);
    }

    async totalBanque() {
        return this.dataSource.query(`
            SELECT count(*) as total FROM banques;
        `);
    }

    async sexe() {
        return this.dataSource.query(`
            SELECT sexe, COUNT(sexe) FROM beneficiaires 
            WHERE "is_delete"='false'
            GROUP BY sexe;
        `);
    }

    async tranchAgeBeneficiaires() {
        return this.dataSource.query(`
            SELECT
                COUNT(case when date_part('year', age(date_naissance))>=18 AND date_part('year', age(date_naissance))<=25 then 1 end) as "De 18-25 ans",
                COUNT(case when date_part('year', age(date_naissance))>25 AND date_part('year', age(date_naissance))<=35 then 1 end) as "De 25-35 ans",
                COUNT(case when date_part('year', age(date_naissance))>35 AND date_part('year', age(date_naissance))<=45 then 1 end) as "De 35-45 ans",
                COUNT(case when date_part('year', age(date_naissance))>45 AND date_part('year', age(date_naissance))<=55 then 1 end) as "De 45-55 ans", 
                COUNT(case when date_part('year', age(date_naissance))>55 AND date_part('year', age(date_naissance))<=65 then 1 end) as "De 55-65 ans"
                FROM beneficiaires 
                WHERE "is_delete"='false';
        `);
    }

    async totalGarantie(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_garantie as decimal(20,2))), 0) as montant_garantie
            FROM banque_cohortes WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP;
        `);
    }

    async totalCreditAccorde(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(credit_accorde as decimal(20,2))), 0) as credit_accorde
            FROM beneficiaires WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "is_delete"='false';
        `);
    }

    async totalARembourser(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(20,2))), 0) as montant_a_rembourser
            FROM beneficiaires WHERE created BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "is_delete"='false';
        `);
    }

    async totalRembourse(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) as montant_payer
            FROM plan_remboursements 
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "plan_remboursements"."created" BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false';
        `);
    }

    async resteARembourse(start_date, end_date) {
        return this.dataSource.query(`
            SELECT (

                (
                    SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(20,2))), 0)
                    FROM beneficiaires WHERE created BETWEEN
                    '${start_date}' ::TIMESTAMP AND
                    '${end_date}' ::TIMESTAMP AND "is_delete"='false'
                )

                -

                (
                    SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0)
                    FROM plan_remboursements 
                    LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
                    WHERE "plan_remboursements"."created" BETWEEN
                    '${start_date}' ::TIMESTAMP AND
                    '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false' 
                )
        
            ) AS reste_a_rembourser; 
        `);
    }





    async progressionRemboursementParSexe(start_date, end_date) {
        return this.dataSource.query(`
        SELECT to_char("plan_remboursements"."date_paiement", 'YYYY-MM-DD') as date, "beneficiaires"."sexe", COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer
        FROM plan_remboursements
        LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
        WHERE "plan_remboursements"."date_paiement"
        BETWEEN
        '${start_date}' ::TIMESTAMP AND
        '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'
        GROUP BY date, sexe
        ORDER BY date ASC;
        `);
    }






    async progressionRemboursementSexeHomme(start_date, end_date) { 
        return this.dataSource.query(`
        SELECT "beneficiaires"."sexe", COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer, to_char("plan_remboursements"."date_paiement", 'YYYY-MM-DD') as month
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "beneficiaires"."sexe"='Homme' AND "plan_remboursements"."date_paiement"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'  
            GROUP BY "beneficiaires"."sexe", "plan_remboursements"."date_paiement"
            ORDER BY "plan_remboursements"."date_paiement";
        `);
    } 
    async progressionRemboursementSexeFemme(start_date, end_date) { 
        return this.dataSource.query(`
        SELECT "beneficiaires"."sexe", COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer, to_char("plan_remboursements"."date_paiement", 'YYYY-MM-DD') as month
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "beneficiaires"."sexe"='Femme' AND "plan_remboursements"."date_paiement"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'  
            GROUP BY "beneficiaires"."sexe", "plan_remboursements"."date_paiement"
            ORDER BY "plan_remboursements"."date_paiement"
        `);
    }
    async progressionRemboursementSexeDate(start_date, end_date) {
        return this.dataSource.query(`
        SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer, to_char("plan_remboursements"."date_paiement", 'YYYY-MM-DD') as month
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "plan_remboursements"."date_paiement"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'  
            GROUP BY "plan_remboursements"."date_paiement"
            ORDER BY "plan_remboursements"."date_paiement"
        `);
    }

    async participationParBanque(start_date, end_date) {
       return this.dataSource.query(`
            SELECT "banques"."name_banque", COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0) AS montant_payer
                FROM plan_remboursements
                LEFT JOIN "banques" ON "banques"."id" = "plan_remboursements"."banqueId"
                LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
                WHERE "plan_remboursements"."created"
                BETWEEN
                '${start_date}' ::TIMESTAMP AND
                '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false' 
                GROUP BY "banques"."name_banque";
        `);
    }

    async statutBeneficiaires() { 
        return this.dataSource.query(`
            SELECT COALESCE("statut", LEFT('Pas de statut', 40)) AS statut, COUNT(*)
            FROM beneficiaires 
            WHERE "is_delete"='false'
            GROUP BY "statut";
        `);
    }

    async tauxParticipatiionProvince() {
        return this.dataSource.query(`
            WITH resultat AS (SELECT COUNT(id) AS total FROM beneficiaires WHERE "is_delete"='false')
            SELECT province, COUNT(province)*100/total AS pourcentage 
            FROM resultat, beneficiaires 
            GROUP BY total, province
            ORDER BY province;
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
                        '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'
                )) AS total_a_rembourse,
            COALESCE((
                        SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0)
                        FROM plan_remboursements
                        LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
                        WHERE "plan_remboursements"."created"
                        BETWEEN
                        '${start_date}' ::TIMESTAMP AND
                        '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false' 
                    )) AS total_rembourse, 
            COALESCE((
                        SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(20,2))), 0)
                        FROM beneficiaires
                        WHERE "beneficiaires"."created"
                        BETWEEN
                        '${start_date}' ::TIMESTAMP AND
                        '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'
                    )
                    -
                    (
                        SELECT COALESCE(SUM(cast(montant_payer as decimal(20,2))), 0)
                        FROM plan_remboursements
                        LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
                        WHERE "plan_remboursements"."created"
                        BETWEEN
                        '${start_date}' ::TIMESTAMP AND
                        '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'
                    ), 0) AS reste_a_rembourse,  
            EXTRACT(MONTH FROM "plan_remboursements"."created" ::TIMESTAMP) as month
            FROM plan_remboursements 
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "plan_remboursements"."created"
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'
            GROUP BY month; 
        `);
    }

    async beneficiaireParCohorte() {
        return this.dataSource.query(`
            SELECT "cohortes"."name_cohorte", COUNT("beneficiaires"."id") AS beneficiaire
            FROM beneficiaires
            LEFT JOIN "cohortes" ON "cohortes"."id" = "beneficiaires"."cohorteId"
            WHERE "cohortes"."is_delete"='false'
            GROUP BY "cohortes"."name_cohorte"; 
        `);
    }

    async statutCohorte(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE("statut_cohorte", LEFT('Pas de statut', 40)) AS statut, COUNT(*)
            FROM cohortes 
            WHERE
            created
            BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "is_delete"='false'
            GROUP BY "statut_cohorte";
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
            '${end_date}' ::TIMESTAMP AND "is_delete"='false'
            GROUP BY "name_secteur";
        `);
    }
 

}
