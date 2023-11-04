import { Banque } from "src/banque/models/banque.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class RemboursementUpdateDto { 
    cohorte?: Cohorte;
    banque?: Banque;
    beneficiaire?: Beneficiaire;
    montant_payer?: string; // Un montant à ajouter chaque mois
    Observation?: string;
    date_paiement?: Date; 
    file_scan?: string;
    signature?: string;
    created?: Date;    
    update_created?: Date;
}