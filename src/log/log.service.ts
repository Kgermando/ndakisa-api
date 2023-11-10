import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm'; 
import { LogUser } from './models/log.entity';

@Injectable()
export class LogService extends AbstractService {
    constructor(
        @InjectRepository(LogUser) private readonly  dataRepository: Repository<LogUser>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
        });
    }

}
