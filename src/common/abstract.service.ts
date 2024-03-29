import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated_result.interface';

@Injectable()
export abstract class AbstractService {

   protected constructor(
    protected readonly repository: Repository<any>
   ) {}


    all(): Promise<any[]> {
        return this.repository.find({order: {'created': 'DESC'}}); 
    }

    async paginate(page: number = 1): Promise<PaginatedResult> {
        const take = 30;

        const [data, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            order: {'update_created': 'DESC'}
        });
        return {
            data: data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    } 

    async create(data): Promise<any> {
        return this.repository.save(data);
    }

    async findOne(condition): Promise<any> {
        return await this.repository.findOne(condition)
    }

    async update(id: number, data): Promise<any> {
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
