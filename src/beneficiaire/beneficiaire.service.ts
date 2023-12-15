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
            relations: { 
                plan_remboursements: true,
            }
        });
    }

    getAllCohorte(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM beneficiaires 
            WHERE "cohorteId"='${id}' ORDER BY created ASC;
        `);
    }

    getAllBanque(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM beneficiaires 
            WHERE "banqueId"='${id}' ORDER BY created ASC;
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
}