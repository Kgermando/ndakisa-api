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
            COUNT(case when date_part('year', age(date_naissance))>55 AND date_part('year', age(date_naissance))<=100 then 1 end) as "De 55 ans et plus"
            FROM beneficiaires 
            WHERE "is_delete"='false';
        `);
    }

    async totalGarantie() {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_garantie as decimal(40,2))), 0) as montant_garantie
            FROM banque_cohortes;
        `);
    }

    async totalCreditAccorde(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(credit_accorde as decimal(40,2))), 0) as credit_accorde
            FROM beneficiaires WHERE date_valeur BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "is_delete"='false';
        `);
    }

    async totalARembourser(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(40,2))), 0) as montant_a_rembourser
            FROM beneficiaires WHERE date_valeur BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "is_delete"='false';
        `);
    }

    async totalRembourse(start_date, end_date) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast(montant_payer as decimal(40,2))), 0) as montant_payer
            FROM plan_remboursements 
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "plan_remboursements"."date_paiement" BETWEEN
            '${start_date}' ::TIMESTAMP AND
            '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false';
        `);
    }

    async resteARembourse(start_date, end_date) {
        return this.dataSource.query(`
            SELECT (

                (
                    SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(40,2))), 0)
                    FROM beneficiaires WHERE date_valeur BETWEEN
                    '${start_date}' ::TIMESTAMP AND
                    '${end_date}' ::TIMESTAMP AND "is_delete"='false'
                )

                -

                (
                    SELECT COALESCE(SUM(cast(montant_payer as decimal(40,2))), 0)
                    FROM plan_remboursements 
                    LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
                    WHERE "plan_remboursements"."date_paiement" BETWEEN
                    '${start_date}' ::TIMESTAMP AND
                    '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false' 
                )
        
            ) AS reste_a_rembourser; 
        `);
    }

    async progressionRemboursementParSexe(start_date, end_date) {
        return this.dataSource.query(`
            SELECT
                to_char(date_paiement, 'YYYY-MM') AS mois_annee,
                SUM(CASE WHEN "beneficiaires"."sexe"  = 'Homme' THEN "plan_remboursements"."montant_payer":: FLOAT ELSE 0 END) AS hommes,
            SUM(CASE WHEN "beneficiaires"."sexe"  = 'Femme' THEN "plan_remboursements"."montant_payer":: FLOAT ELSE 0 END) AS femmes
            FROM
                plan_remboursements
            JOIN
                "beneficiaires" ON  "plan_remboursements"."beneficiaireId" = "beneficiaires"."id" 
            WHERE
                date_paiement IS NOT NULL
                AND date_paiement BETWEEN '${start_date}'::TIMESTAMP AND '${end_date}'::TIMESTAMP
                AND is_delete = 'false'
            GROUP BY
                mois_annee
            ORDER BY
                mois_annee;
        `);
    }

    // async progressionRemboursementParSexe(start_date, end_date) {
    //     return this.dataSource.query(`
    //         SELECT
    //             to_char(date_trunc('month', "plan_remboursements"."date_paiement"), 'YYYY-MM') AS mois,
    //             SUM(CASE WHEN "beneficiaires"."sexe"  = 'Homme' THEN "plan_remboursements"."montant_payer":: FLOAT ELSE 0 END) AS hommes,
    //             SUM(CASE WHEN "beneficiaires"."sexe"  = 'Femme' THEN "plan_remboursements"."montant_payer":: FLOAT ELSE 0 END) AS femmes
    //         FROM plan_remboursements
    //         JOIN
    //             "beneficiaires" ON  "plan_remboursements"."beneficiaireId" = "beneficiaires"."id" 
    //         WHERE "plan_remboursements"."date_paiement" IS NOT NULL  
    //             AND "plan_remboursements"."date_paiement"
    //             BETWEEN '${start_date}' ::TIMESTAMP AND '${end_date}' ::TIMESTAMP 
    //             AND "beneficiaires"."is_delete"='false'  
    //         GROUP BY 
    //                   "plan_remboursements"."date_paiement"
    //         ORDER BY
    //                   "plan_remboursements"."date_paiement";
      
    //     `);
    // }


    // async progressionRemboursementParSexe(start_date, end_date) {
    //     return this.dataSource.query(`
    //         SELECT
    //             "beneficiaires"."sexe" AS sexe,
    //             to_char(date_trunc('month', "plan_remboursements"."date_paiement"), 'YYYY-MM') AS mois,
    //             SUM("plan_remboursements"."montant_payer":: FLOAT) AS montant_payer
    //         FROM
    //             plan_remboursements
    //         JOIN
    //             "beneficiaires" ON  "plan_remboursements"."beneficiaireId" = "beneficiaires"."id" 
    //         WHERE "plan_remboursements"."date_paiement" IS NOT NULL  
    //             AND "plan_remboursements"."date_paiement"
    //             BETWEEN '${start_date}' ::TIMESTAMP AND '${end_date}' ::TIMESTAMP 
    //             AND "beneficiaires"."is_delete"='false'  
    //         GROUP BY
    //             "beneficiaires"."sexe",
    //             "plan_remboursements"."date_paiement"
    //         ORDER BY
    //             "plan_remboursements"."date_paiement";
    //     `);
    // }

    // async progressionRemboursementParSexe1(start_date, end_date) {
    //     return this.dataSource.query(`
    //         SELECT
    //             "beneficiaires"."sexe",
    //             to_char(date_trunc('month', "plan_remboursements"."date_paiement"), 'YYYY-MM') AS mois,
    //             SUM("plan_remboursements"."montant_payer":: FLOAT) AS montant_payer
    //         FROM
    //             plan_remboursements
    //         JOIN
    //             "beneficiaires" ON  "plan_remboursements"."beneficiaireId" = "beneficiaires"."id" 
    //         WHERE "plan_remboursements"."date_paiement" IS NOT NULL
    //         GROUP BY
    //             "beneficiaires"."sexe",
    //             "plan_remboursements"."date_paiement"
    //         ORDER BY
    //             "plan_remboursements"."date_paiement";

    //         SELECT
    //         to_char(date_trunc('month', "plan_remboursements"."date_paiement"), 'YYYY-MM') AS mois,
    //         "beneficiaires"."sexe",
    //         SUM("plan_remboursements"."montant_payer":: FLOAT) AS montant_payer
    //         FROM plan_remboursements
    //         LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
    //         WHERE "plan_remboursements"."montant_payer":: FLOAT > '0' AND "plan_remboursements"."date_paiement"
    //         BETWEEN
    //         '${start_date}' ::TIMESTAMP AND
    //         '${end_date}' ::TIMESTAMP AND "beneficiaires"."is_delete"='false'  
    //         GROUP BY mois, "beneficiaires"."sexe"
    //         ORDER BY mois;
    //     `);
    // }


    async participationParBanque(start_date, end_date) {
       return this.dataSource.query(`
            SELECT "banques"."name_banque", COALESCE(SUM(cast(montant_payer as decimal(40,2))), 0) AS montant_payer
                FROM plan_remboursements
                LEFT JOIN "banques" ON "banques"."id" = "plan_remboursements"."banqueId"
                LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
                WHERE "plan_remboursements"."date_paiement"
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

    // Montant_a_rembourser, montant_rembourse, reste_a_rembourser par month
    async remboursementTotalEtReste(start_date, end_date) {
        return this.dataSource.query(`
            SELECT
                to_char(date_trunc('month', "plan_remboursements"."date_de_rembousement"), 'YYYY-MM') AS month,
                COALESCE(SUM(cast("beneficiaires"."montant_a_debourser" as decimal(40,2))), 0) AS montant_a_rembourser,
                COALESCE(SUM(cast("plan_remboursements"."montant_payer" as decimal(40,2))), 0) AS montant_rembourse,
                COALESCE(SUM(cast("beneficiaires"."montant_a_debourser" as decimal(40,2))) - SUM(cast( "plan_remboursements"."montant_payer" as decimal(40,2))), 0) AS reste_a_rembourser
            FROM plan_remboursements
            INNER JOIN beneficiaires ON "plan_remboursements"."beneficiaireId" = "beneficiaires"."id"
            WHERE "plan_remboursements"."date_de_rembousement"
                        BETWEEN
                        '${start_date}' ::TIMESTAMP AND
                        '${end_date}' ::TIMESTAMP 
                AND "beneficiaires"."is_delete"='false' 
            GROUP BY month
            ORDER BY month ASC;  
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

    async statutCohorte() {
        return this.dataSource.query(`
            SELECT COALESCE("statut_cohorte", LEFT('Pas de statut', 40)) AS statut, COUNT(*)
            FROM cohortes 
            WHERE "is_delete"='false'
            GROUP BY "statut_cohorte";
        `);
    }

    async secteurActivite() {
        return this.dataSource.query(`
            SELECT COALESCE("name_secteur", LEFT('Pas de secteur', 40)) AS name_secteur, COUNT(*)
            FROM beneficiaires
            LEFT JOIN "secteurs" ON "secteurs"."id" = "beneficiaires"."secteurActiviteId"
            WHERE "is_delete"='false'
            GROUP BY "name_secteur";
        `);
    }

    // Reste a rembourser pour les beneficieres interrompus
    async remboursementsInterrompus() {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast((

                (
                    SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(40,2))), 0)
                    FROM beneficiaires 
                    WHERE "beneficiaires"."statut"='Interrompu' AND "is_delete"='false'
                )

                -

                (
                    SELECT COALESCE(SUM(cast(montant_payer as decimal(40,2))), 0)
                    FROM plan_remboursements 
                    LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
                    WHERE "beneficiaires"."statut"='Interrompu' AND "beneficiaires"."is_delete"='false' 
                )
        
            ) as decimal(40,2))), 0)  AS reste_interrompu;
        `);
    }

    async remboursementsInterrompuPourcent() {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast((
                SELECT ( 
                    (
                        SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(40,2))), 0)
                        FROM beneficiaires 
                        WHERE "beneficiaires"."statut"='Interrompu' AND "is_delete"='false'
                    )
    
                    -
    
                    (
                        SELECT COALESCE(SUM(cast(montant_payer as decimal(40,2))), 0)
                        FROM plan_remboursements 
                        LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
                        WHERE "beneficiaires"."statut"='Interrompu' AND "beneficiaires"."is_delete"='false' 
                    ) 
                )
                /
                (
                    SELECT COALESCE(SUM(cast(montant_a_debourser as decimal(40,2))), 0)
                    FROM beneficiaires 
                    WHERE "is_delete"='false'
                ) 
                * 100

            )  as decimal(40,2))), 0) AS pourcent_interrompu;
        `);
    }
 

}
