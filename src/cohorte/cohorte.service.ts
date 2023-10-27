import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Cohorte } from './models/cohorte.entity';

@Injectable()
export class CohorteService extends AbstractService {
    constructor(
        @InjectRepository(Cohorte) private readonly  dataRepository: Repository<Cohorte>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    
}

