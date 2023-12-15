import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { Workbook } from 'exceljs';
import * as tmp  from 'tmp';
import { Cohorte } from './models/cohorte.entity';
import { CohorteExcel } from './models/cohorte_excel';

@Injectable()
export class CohorteService extends AbstractService {
    constructor(
        @InjectRepository(Cohorte) private readonly  dataRepository: Repository<Cohorte>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    async getAllData(): Promise<any> {
        return await this.repository.find({
            where: {is_delete: false},
            order: {created: 'DESC'},
            // relations: {
            //     beneficiaires: true,
            //     plan_remboursements: true
            // }
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

    getCreditAccorde(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast("beneficiaires"."credit_accorde" as decimal(20,2))), 0) AS credit_accorde
            FROM beneficiaires WHERE "cohorteId"='${id}' AND "is_delete"='false'
        `);
    }


    async tauxProgessionCohorte(id) {
        return this.dataSource.query(`
            WITH resultat_montant_a_rembourser AS (
                SELECT COALESCE(SUM(cast("beneficiaires"."montant_a_debourser" as decimal(20,2))), 0) AS montant_a_rembourser
                FROM beneficiaires WHERE "cohorteId"='${id}' AND "is_delete"='false'
            ),
            resultat_montant_payer AS (
                SELECT COALESCE(SUM(cast("plan_remboursements"."montant_payer" as decimal(20,2))), 0) AS montant_payer
                FROM plan_remboursements WHERE "cohorteId"='${id}'
            )
        
            SELECT COALESCE(
                cast(montant_payer*100/
                (
                    CASE(montant_a_rembourser) WHEN 0 THEN 1
                    ELSE (montant_a_rembourser) END
                ) as decimal(20,2)), 0
            ) AS pourcentage 

            FROM resultat_montant_payer, resultat_montant_a_rembourser;
        `);
    }

    async nbreBeneficiaireCohorte(id) {
        return this.dataSource.query(`
            SELECT COUNT(*) FROM beneficiaires WHERE "cohorteId"='${id}' AND "is_delete"='false';
        `);
    }

    async downloadExcel(start_date, end_date) {

        let data: CohorteExcel[] = [];

        data = await this.dataSource.query(`
            SELECT "beneficiaires"."id",
            "cohortes"."name_cohorte",
            "cohortes"."contrat_ref",
            "cohortes"."statut_cohorte",
            "banques"."name_banque",
            "beneficiaires"."name_beneficiaire",
            "beneficiaires"."sexe",
            "beneficiaires"."date_naissance",
            "beneficiaires"."province",
            "beneficiaires"."identifiant",
            "beneficiaires"."email",
            "beneficiaires"."telephone",
            "beneficiaires"."raison_sociale",
            "secteurs"."name_secteur",
            "beneficiaires"."numero_impot",
            "beneficiaires"."id_nat",
            "beneficiaires"."rccm",
            "beneficiaires"."compte_bancaire",
            "beneficiaires"."adresse",
            "beneficiaires"."montant_garantie",
            "beneficiaires"."credit_accorde",
            "beneficiaires"."interet_beneficiaire",
            "beneficiaires"."montant_a_debourser",
            "beneficiaires"."delai_de_grace",
            "beneficiaires"."duree_credit",
            "beneficiaires"."date_valeur",
            "beneficiaires"."date_maturite",
            "beneficiaires"."statut",
            "beneficiaires"."signature",
            "beneficiaires"."created",
            "beneficiaires"."update_created"
            FROM beneficiaires
            LEFT JOIN "cohortes" ON "cohortes"."id" = "beneficiaires"."cohorteId"
            LEFT JOIN "banques" ON "banques"."id" = "beneficiaires"."banqueId"
            LEFT JOIN "secteurs" ON "secteurs"."id" = "beneficiaires"."secteurActiviteId"
            WHERE "beneficiaires"."created">='${start_date}' AND 
            "beneficiaires"."created"<='${end_date}' AND "is_delete"='false';
        `);

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: CohorteExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('BENEFICIAIRES PAR COHORTE');

        const headers = [
            { header: 'ID', key: 'id', width: 10.5 },
            { header: 'Nom cohorte', key: 'name_cohorte', width: 20.5 },
            { header: 'Contrat ref', key: 'contrat_ref', width: 20.5 },
            { header: 'Statut cohorte', key: 'statut_cohorte', width: 20.5 },
            { header: 'Nom banque', key: 'name_banque', width: 30.5 },
            { header: 'Nom du bénéficiaire', key: 'name_beneficiaire', width: 20.5 },
            { header: 'Sexe', key: 'sexe', width: 30.5 },
            { header: 'Date de naissance', key: 'date_naissance', width: 25.5 },
            { header: 'Province', key: 'province', width: 20.5 },
            { header: 'Identifiant', key: 'identifiant', width: 20.5 },
            { header: 'Email', key: 'email', width: 20.5 },
            { header: 'Téléphone', key: 'telephone', width: 20.5 },
            { header: 'Raison sociale', key: 'raison_sociale', width: 20.5 },
            { header: 'Secteur activité', key: 'name_secteur', width: 20.5 },
            { header: 'N° impôt', key: 'numero_impot', width: 20.5 },
            { header: 'Id nat', key: 'id_nat', width: 30.5 },
            { header: 'RCCM', key: 'rccm', width: 30.5 },
            { header: 'Compte bancaire', key: 'compte_bancaire', width: 30.5 },
            { header: 'Adresse', key: 'adresse', width: 30.5 },
            { header: 'Montant garantie', key: 'montant_garantie', width: 30.5 },
            { header: 'Credit accordé', key: 'credit_accorde', width: 30.5 },
            { header: 'Interêt', key: 'interet_beneficiaire', width: 20.5 },
            { header: 'Montant à rembourser', key: 'montant_a_debourser', width: 20.5 },
            { header: 'Delai de grâce', key: 'delai_de_grace', width: 20.5 },
            { header: 'Durée crédit', key: 'duree_credit', width: 20.5 },
            { header: 'Date valeur', key: 'date_valeur', width: 10.5 },
            { header: 'Date maturité', key: 'date_maturite', width: 20.5 },
            { header: 'Statut bénéficiaire', key: 'statut', width: 20.5 },
            
            { header: 'Signature', key: 'signature', width: 20.5 },
            { header: 'Date de création', key: 'created', width: 20.5 },
            { header: 'Mise à jour', key: 'update_created', width: 20.5 },
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
  
  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }
}
