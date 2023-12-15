import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Beneficiaire } from './models/beneficiaire.entity';

@Injectable()
export class BeneficiaireService extends AbstractService {
    constructor(
        @InjectRepository(Beneficiaire) private readonly  dataRepository: Repository<Beneficiaire>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    async findGetAll(): Promise<any[]> {
        return await this.repository.find({
            where: {is_delete: false},
            relations: { 
                plan_remboursements: true,
            }
        });
    }

 
    getAllCohorte(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM beneficiaires
            LEFT JOIN "cohortes" ON "cohortes"."id" = "beneficiaires"."cohorteId"
            LEFT JOIN "banques" ON "banques"."id" = "beneficiaires"."banqueId"
            WHERE "cohorteId"='${id}' AND "beneficiaires"."is_delete"='false' ORDER BY "beneficiaires"."created" ASC;
        `);
    }

    getAllBanque(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM beneficiaires 
            LEFT JOIN "cohortes" ON "cohortes"."id" = "beneficiaires"."cohorteId"
            LEFT JOIN "banques" ON "banques"."id" = "beneficiaires"."banqueId"
            WHERE "banqueId"='${id}' AND "beneficiaires"."is_delete"='false' ORDER BY "beneficiaires"."created" ASC;
        `);
    }


    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                cohorte: true,
                banque: true, 
                plan_remboursements: true,
                secteur_activite: true,
            } 
        });
    }


    async tauxProgessionBeneficiaire(id) {
        return this.dataSource.query(`
            WITH resultat_montant_a_rembourser AS (
                SELECT COALESCE(SUM(cast("beneficiaires"."montant_a_debourser" as decimal(20,2))), 0) AS montant_a_rembourser
                FROM beneficiaires WHERE "id"='${id}'
            ),
            resultat_montant_payer AS (
                SELECT COALESCE(SUM(cast("plan_remboursements"."montant_payer" as decimal(20,2))), 0) AS montant_payer
                FROM plan_remboursements WHERE "beneficiaireId"='${id}'
            )
        
            SELECT COALESCE(
                cast(montant_payer*100/
                (
                    CASE(montant_a_rembourser) WHEN 0 THEN 1
                    ELSE (montant_a_rembourser) END
                ) as decimal(20,2)), 0
            ) AS pourcentage 

            FROM resultat_montant_payer, resultat_montant_a_rembourser;
        `);
    }
}