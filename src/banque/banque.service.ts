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

    async getAllData(): Promise<any> {
        return await this.repository.find({
            relations: {
                beneficiaires: true,
                plan_remboursements: true
            }
        });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                beneficiaires: true,
                plan_remboursements: true
            }
        });
    }
}

