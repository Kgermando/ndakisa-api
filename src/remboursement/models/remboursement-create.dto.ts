import { IsNotEmpty } from "class-validator";
import { Banque } from "src/banque/models/banque.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class RemboursementCreateDto { 

    @IsNotEmpty()
    cohorte: Cohorte;

    @IsNotEmpty()
    banque: Banque;

    @IsNotEmpty()
    beneficiaire: Beneficiaire;

    @IsNotEmpty()
    montant_payer: string; // Un montant à ajouter chaque mois
     
    @IsNotEmpty()
    observation: string;

    @IsNotEmpty()
    date_paiement: Date; 

    file_scan: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}