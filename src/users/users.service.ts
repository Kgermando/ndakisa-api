import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UsersService extends AbstractService {
    constructor(
        @InjectRepository(User) private readonly  dataRepository: Repository<User>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    async getAllData(): Promise<any> {
        return await this.repository.find({
            where: {is_delete: false},
            order: {created: 'DESC'}, 
        });
    }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
        });
    }

}
