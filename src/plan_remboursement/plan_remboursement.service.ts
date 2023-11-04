import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { PlanRemboursement } from './models/plan_remboursement.entity';

@Injectable()
export class PlanRemboursementService extends AbstractService {
    constructor(
        @InjectRepository(PlanRemboursement) private readonly  dataRepository: Repository<PlanRemboursement>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM plan_remboursements 
            WHERE "beneficiaireId"='${id}' ORDER BY created ASC;
        `);
    }

    // async findGetAll(): Promise<any> {
    //     return await this.repository.find({
    //         order: {'created': 'ASC'},
    //         relations: {
    //             beneficiaire: true, 
    //         } 
    //     });
    // }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                beneficiaire: true, 
            }
        });
    }
}