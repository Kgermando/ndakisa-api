import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { SupportModuleDoc } from './models/support-module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SupportModuleService extends AbstractService {
    constructor(
        @InjectRepository(SupportModuleDoc) private readonly supportRepository: Repository<SupportModuleDoc>
    ) {
        super(supportRepository); 
    } 

    allGet(): Promise<any[]> {
        return this.repository.find({
            order: {'created': 'ASC'}
        }); 
    }


    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
        })
    }


}
