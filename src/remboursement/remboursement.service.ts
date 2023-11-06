import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Remboursement } from './models/remboursement.entity';

@Injectable()
export class RemboursementService  extends AbstractService {
    constructor(
        @InjectRepository(Remboursement) private readonly  dataRepository: Repository<Remboursement>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM remboursements 
            WHERE "beneficiaireId"='${id}' ORDER BY created ASC;
        `);
    } 

    findGetAllBanque(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM remboursements 
            WHERE "banqueId"='${id}' ORDER BY created ASC;
        `);
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                cohorte: true,
                banque: true,
            }
        });
    }
}
