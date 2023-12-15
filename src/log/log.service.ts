import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Raw, Repository } from 'typeorm'; 
import { LogUser } from './models/log.entity'; 
import { Workbook } from 'exceljs';
import * as tmp  from 'tmp';


@Injectable()
export class LogService extends AbstractService {
    constructor(
        @InjectRepository(LogUser) private readonly  dataRepository: Repository<LogUser>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    allGetLog(start_date, end_date): Promise<any[]> {
        return this.dataSource.query(`
            SELECT "users"."id",
            "users"."matricule",
            "logs_users"."date_operation",
            "logs_users"."type_operation",
            "logs_users"."module",
            "logs_users"."title",
            "logs_users"."observation"
            FROM logs_users
            LEFT JOIN "users" ON "users"."id" = "logs_users"."userId"
            WHERE "logs_users"."date_operation">='${start_date}' AND 
            "logs_users"."date_operation"<='${end_date}' ORDER BY date_operation DESC;
        `);
    }
 

    // async paginateFilter(page: number = 1, start_date, end_date): Promise<PaginatedResult> {
    //     const take = 30;

    //     const [data, total] = await this.repository.findAndCount({
    //         take,
    //         skip: (page - 1) * take,
    //         where: {date_operation: Raw(`
    //         "date_operation"
    //             BETWEEN
    //             '${start_date}' ::TIMESTAMP AND
    //             '${end_date}' ::TIMESTAMP
    //         `)},
    //         order: {'date_operation': 'DESC'}
    //     });
    //     return {
    //         data: data,
    //         meta: {
    //             total,
    //             page,
    //             last_page: Math.ceil(total / take)
    //         }
    //     }
    // }

    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
        });
    }



    async downloadExcel(start_date, end_date) {

        let data: LogUser[] = [];

        data = await this.dataSource.query(`
            SELECT  
            "users"."matricule",
            "logs_users"."date_operation",
            "logs_users"."type_operation",
            "logs_users"."module",
            "logs_users"."title",
            "logs_users"."observation"
            FROM logs_users
            LEFT JOIN "users" ON "users"."id" = "logs_users"."userId"
            WHERE "logs_users"."date_operation">='${start_date}' AND 
            "logs_users"."date_operation"<='${end_date}';
        `);

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: LogUser[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('BENEFICIAIRES PAR COHORTE');

        const headers = [ 
            { header: 'Matricule', key: 'matricule', width: 20.5 },
            { header: 'Date d\'opération', key: 'date_operation', width: 20.5 },
            { header: 'Type d\'opération', key: 'type_operation', width: 20.5 },
            { header: 'Module', key: 'module', width: 30.5 },
            { header: 'Titre', key: 'title', width: 35.5 },
            { header: 'Observation', key: 'observation', width: 50.5 }
        ]

        sheet.columns = headers;
        sheet.addRows(rows);

        this.styleSheet(sheet);

        let File = await new Promise((resolve, reject) => {
            tmp.file({discardDescriptor: true, prefix: `myexcelsheet`, postfix: '.xlsx', mode: parseInt('0600', 8)},
                async (err, file) => {
                if(err) throw new BadRequestException(err); 

                book.xlsx.writeFile(file).then(_ => {
                    console.log('_', resolve(file));
                    resolve(file)
                }).catch(err => {
                    throw new BadRequestException(err);
                });
            });
        });

        return File;
    }



    private styleSheet(sheet) {

        // Set the height of header
        sheet.getRow(1).height = 30.5;

        // Font color
        sheet.getRow(1).font = { size: 11.5, bold: true, color: {argb: 'FFFFFF'}};

        // Background color
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', bgColor: {argb: '1E4C87'}, fgColor: { argb: '1E4C87'}};

        // Alignments
        sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

        // Border
        sheet.getRow(1).border = {
            top: { style: 'thin', color: { argb: '000000'}},
            left: { style: 'thin', color: { argb: 'FFFFFF'}}, 
            bottom: { style: 'thin', color: { argb: '000000'}},
            right: { style: 'thin', color: { argb: 'FFFFFF'}}
        }

    }

}
