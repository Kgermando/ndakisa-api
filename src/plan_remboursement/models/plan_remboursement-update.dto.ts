import { Banque } from "src/banque/models/banque.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class PlanRemboursementUpdateDto { 
    cohorte?: Cohorte;
    banque?: Banque;
    beneficiaire?: Beneficiaire;
    date_de_rembousement?: Date;
    credit_en_debut_periode?: string;
    // mensualite?: Date;
    interet?: string;
    capital?: string;
    montant_payer?: string; // Un montant à ajouter chaque mois
    Observation?: string;
    date_paiement?: Date; 
    file_scan?: string;
    signature?: string;
    created?: Date;    
    update_created?: Date;
}