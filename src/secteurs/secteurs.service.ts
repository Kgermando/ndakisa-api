import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Secteur } from './models/secteur.entity';

@Injectable()
export class SecteursService extends AbstractService {
    constructor(
        @InjectRepository(Secteur) private readonly  dataRepository: Repository<Secteur>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    } 


    // async findGetAll(): Promise<any> {
    //     return await this.repository.find({
    //         order: {created: 'ASC'},
    //         relations: {
    //             beneficiaires: true, 
    //         } 
    //     });
    // }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                beneficiaires: true,
                plan_remboursements: true,
            }
        });
    }

}
