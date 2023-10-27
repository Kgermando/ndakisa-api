import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Banque } from './models/banque.entity';

@Injectable()
export class BanqueService extends AbstractService {
    constructor(
        @InjectRepository(Banque) private readonly  dataRepository: Repository<Banque>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }
}

