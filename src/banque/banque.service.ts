import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Banque } from './models/banque.entity';

@Injectable()
export class BanqueService extends AbstractService {
    constructor(
        @InjectRepository(Banque) private readonly  dataRepository: Repository<Banque>, 
    ) {
        super(dataRepository); 
    } 

    async getAllData(): Promise<any> {
        return await this.repository.find({
            relations: {
                beneficiaires: true,
                plan_remboursements: true,
                banque_cohortes: true
            }
        });
    }
    

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                beneficiaires: true,
                plan_remboursements: true,
                banque_cohortes: true
            }
        });
    }
}

