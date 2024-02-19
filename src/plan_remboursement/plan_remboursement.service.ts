import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { DataSource, Repository } from 'typeorm';
import { PlanRemboursement } from './models/plan_remboursement.entity';
import { PlanRemboursementExcel } from './models/plan_remboursement_excel';
import { Workbook } from 'exceljs';
import * as tmp  from 'tmp';

@Injectable()
export class PlanRemboursementService extends AbstractService {
    constructor(
        @InjectRepository(PlanRemboursement) private readonly  dataRepository: Repository<PlanRemboursement>,
        @InjectDataSource() private dataSource: DataSource,
    ) {
        super(dataRepository); 
    }

    findGetAll(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT "plan_remboursements"."id",
            "plan_remboursements"."date_de_rembousement",
            "plan_remboursements"."delai_reajustement",
            "plan_remboursements"."credit_en_debut_periode",
            "plan_remboursements"."interet",
            "plan_remboursements"."capital",
            "plan_remboursements"."montant_payer",
            "plan_remboursements"."date_paiement",
            "plan_remboursements"."observation",
            "plan_remboursements"."file_scan",
            "plan_remboursements"."signature",
            "plan_remboursements"."created",
            "plan_remboursements"."update_created",
            "beneficiaires"."name_beneficiaire"
            FROM plan_remboursements 
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "beneficiaireId"='${id}' ORDER BY date_de_rembousement ASC;
        `);
    }

    getAllPlanRemboursementBanque(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "plan_remboursements"."banqueId"='${id}' AND "beneficiaires"."is_delete"='false';
        `);
    }

    getAllPlanRemboursementCohorte(id): Promise<any[]> {
        return this.dataSource.query(`
            SELECT *
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId"
            WHERE "plan_remboursements"."cohorteId"='${id}' AND "beneficiaires"."is_delete"='false';
        `);
    } 


    async totalResteARembourser(id) {
        return this.dataSource.query(`
            WITH resultat_montant_a_rembourser AS (
                SELECT COALESCE(SUM(cast("beneficiaires"."montant_a_debourser" as decimal(20,2))), 0) AS montant_a_rembourser
                FROM beneficiaires WHERE "id"='${id}' AND "is_delete"='false'
            ),
            resultat_montant_payer AS (
                SELECT COALESCE(SUM(cast("plan_remboursements"."montant_payer" as decimal(20,2))), 0) AS montant_payer
                FROM plan_remboursements WHERE "beneficiaireId"='${id}'
            )
        
            SELECT montant_payer::FLOAT - montant_a_rembourser::FLOAT AS reste_a_rembourser 

            FROM resultat_montant_payer, resultat_montant_a_rembourser;
        `);
    }

    async totalRemboursE(id) {
        return this.dataSource.query(`
            SELECT COALESCE(SUM(cast("plan_remboursements"."montant_payer" as decimal(20,2))), 0) AS montant_payer
            FROM plan_remboursements WHERE "beneficiaireId"='${id}'
        `);
    }


    async findGetOne(condition): Promise<any> {
        return await this.repository.findOne({
            where: condition,
            relations: {
                beneficiaire: true, 
            }
        });
    }


    async deleteAll(id: number) {
        return this.dataSource.query(`
            DELETE FROM "plan_remboursements"
            WHERE "beneficiaireId"='${id}';
        `);
    }



    async downloadExcel(id: number) {

        let data: PlanRemboursementExcel[] = [];

        data = await this.dataSource.query(`
            SELECT "beneficiaires"."id",
            "beneficiaires"."name_beneficiaire",
            "beneficiaires"."sexe",
            "beneficiaires"."province",
            "beneficiaires"."identifiant", 
            "beneficiaires"."compte_bancaire",
            "beneficiaires"."credit_accorde",
            "beneficiaires"."interet_beneficiaire",
            "beneficiaires"."montant_a_debourser",
            "beneficiaires"."delai_de_grace",
            "beneficiaires"."duree_credit",
            "beneficiaires"."date_valeur",
            "beneficiaires"."date_maturite",
            "beneficiaires"."statut",
            "plan_remboursements"."date_de_rembousement",
            "plan_remboursements"."delai_reajustement",
            "plan_remboursements"."credit_en_debut_periode",
            "plan_remboursements"."interet",
            "plan_remboursements"."capital",
            "plan_remboursements"."montant_payer",
            "plan_remboursements"."date_paiement",
            "plan_remboursements"."observation", 
            "plan_remboursements"."signature",
            "plan_remboursements"."created",
            "plan_remboursements"."update_created"
            FROM plan_remboursements
            LEFT JOIN "beneficiaires" ON "beneficiaires"."id" = "plan_remboursements"."beneficiaireId" 
            WHERE "beneficiaires"."id"='${id}';
        `);

        if(!data) {
            throw new NotFoundException("No data download");
        }

        let rows: PlanRemboursementExcel[] = [];

        data.forEach(doc => {
            rows.push(doc);
        });

        let book = new Workbook();
        let sheet = book.addWorksheet('PLAN DE REMBOURSEMENTS');

        const headers = [
            // { header: 'ID', key: 'id', width: 10.5 },
            { header: 'Nom du bénéficiaire', key: 'name_beneficiaire', width: 20.5 },
            { header: 'Sexe', key: 'sexe', width: 30.5 },
            { header: 'Province', key: 'province', width: 20.5 },
            { header: 'Identifiant', key: 'identifiant', width: 20.5 },
            { header: 'Compte bancaire', key: 'compte_bancaire', width: 30.5 },
            { header: 'Credit accordé', key: 'credit_accorde', width: 30.5 },
            { header: 'Interêt', key: 'interet_beneficiaire', width: 20.5 },
            { header: 'Montant à rembourser', key: 'montant_a_debourser', width: 20.5 },
            { header: 'Delai de grâce', key: 'delai_de_grace', width: 20.5 },
            { header: 'Durée crédit', key: 'duree_credit', width: 20.5 },
            { header: 'Date valeur', key: 'date_valeur', width: 10.5 },
            { header: 'Date maturité', key: 'date_maturite', width: 20.5 },
            { header: 'Statut bénéficiaire', key: 'statut', width: 20.5 },
            { header: 'Date de remboursement', key: 'date_de_rembousement', width: 20.5 },
            { header: 'Délai de réajustement', key: 'delai_reajustement', width: 30.5 },
            { header: 'Crédit en debut periode', key: 'credit_en_debut_periode', width: 30.5 },
            { header: 'Interêt', key: 'interet', width: 20.5 },
            { header: 'Capital', key: 'capital', width: 20.5 },
            // { header: 'Mensualité', key: '+capital + +interet', width: 20.5 },
            { header: 'Montant payer', key: 'montant_payer', width: 20.5 },
            { header: 'Date paiement', key: 'date_paiement', width: 20.5 },
            { header: 'Observation', key: 'observation', width: 20.5 },
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