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

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                cohorte: true,
                banque: true,
                remboursements: true,
                plan_remboursements: true,
            }
        });
    }

    // allGet(): Promise<any[]> {
    //     return this.dataSource.query(`
    //     SELECT "beneficiaires"."id",
    //     "plan_remboursements"."date_de_rembousement",
    //     "plan_remboursements"."credit_en_debut_periode",
    //     "plan_remboursements"."mensualite",
    //     "plan_remboursements"."interet",
    //     "plan_remboursements"."capital",
    //     "remboursements"."montant_payer",
    //     "remboursements"."date_paiement",
    //     "remboursements"."observation",
    //     "remboursements"."file_scan"
    //     FROM beneficiaires 
    //     LEFT JOIN "plan_remboursements" ON "plan_remboursements"."id" = "beneficiaires"."plan_remboursementsId"
    //     LEFT JOIN "remboursements" ON "remboursements"."id" = "beneficiaires"."remboursementsId"
    //     ORDER BY "beneficiaires"."created" ASC;
    // `);
        
    // }
}