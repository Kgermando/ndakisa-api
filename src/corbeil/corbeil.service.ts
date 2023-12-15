import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CorbeilService {
    constructor( 
        @InjectDataSource() private dataSource: DataSource,
    ) {
        
    }

    getAllCohorte(): Promise<any[]> {
        return this.dataSource.query(`
            SELECT id, 
                name_cohorte AS title,
                update_created,
                type
            FROM cohortes 
            WHERE "is_delete"='true';
        `);
    }

    getAllBeneficiaire(): Promise<any[]> {
        return this.dataSource.query(`
            SELECT id, 
                name_beneficiaire AS title,
                update_created,
                type
            FROM beneficiaires 
            WHERE "is_delete"='true';
        `);
    }

    getAllUser(): Promise<any[]> {
        return this.dataSource.query(`
            SELECT id, 
                matricule AS title,
                update_created,
                type
            FROM users 
            WHERE "is_delete"='true';
        `);
    }
}
