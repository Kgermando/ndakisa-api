import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Archive } from './models/archive.entity';

@Injectable()
export class ArchiveService extends AbstractService {
    constructor(
        @InjectRepository(Archive) private readonly  dataRepository: Repository<Archive>, 
    ) {
        super(dataRepository); 
    }  

    // async paginate(page: number = 1): Promise<any> {
    //     const {data, meta} = await super.paginate(page);
        
    //     return {
    //         data: data,
    //         meta
    //     }
    // }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition, 
        });
    }
}

