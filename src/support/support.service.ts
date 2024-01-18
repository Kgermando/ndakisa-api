import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'; 
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { SupportDoc } from './models/support.entity';

@Injectable()
export class SupportService extends AbstractService {
    constructor(
        @InjectRepository(SupportDoc) private readonly supportRepository: Repository<SupportDoc>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(supportRepository); 
    } 

    allGet(): Promise<any[]> {
        return this.repository.find();  
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM supports 
            WHERE "moduleId"='${id}';
        `);
    }


    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                module: true,
            }
        })
    }

 }
