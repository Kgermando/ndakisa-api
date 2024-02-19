import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { BanqueCohorte } from './models/banque-cohorte.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BanqueCohorteService extends AbstractService {
    constructor(
        @InjectRepository(BanqueCohorte) private readonly  dataRepository: Repository<BanqueCohorte>, 
        @InjectDataSource() private dataSource: DataSource,
        ) {
        super(dataRepository); 
    }


    async totalGuarantieBanque(id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast("banque_cohortes"."montant_garantie" as decimal(20,2))), 0) AS montant_garantie
            FROM banque_cohortes WHERE "banqueId"='${id}'
        `);
    }

    async totalGuarantieCohorte(id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast("banque_cohortes"."montant_garantie" as decimal(20,2))), 0) AS montant_garantie
            FROM banque_cohortes WHERE "cohorteId"='${id}'
        `);
    }


    async getAllData(): Promise<any> {
        return await this.repository.find({
            relations: {
                banque: true,
                cohorte: true
            }
        });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                banque: true,
                cohorte: true
            }
        });
    }
}