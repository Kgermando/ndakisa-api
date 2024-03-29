import { Banque } from "src/banque/models/banque.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";
import { Secteur } from "src/secteurs/models/secteur.entity";

export class PlanRemboursementUpdateDto { 
    cohorte?: Cohorte;
    banque?: Banque;
    beneficiaire?: Beneficiaire;
    secteur_activite?: Secteur;
    date_de_rembousement?: Date;
    delai_reajustement?: number;
    credit_en_debut_periode?: string; 
    interet?: string;
    capital?: string;
    montant_payer?: string; // Un montant à ajouter chaque mois
    Observation?: string;
    date_paiement?: Date; 
    numero_transaction?: string;
    signature?: string;
    created?: Date;    
    update_created?: Date;
}