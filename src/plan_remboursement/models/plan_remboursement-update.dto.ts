import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class PlanRemboursementUpdateDto { 
    beneficiaire?: Beneficiaire;
    date_de_rembousement?: Date;
    credit_en_debut_periode?: string;
    mensualite?: Date;
    interet?: string;
    capital?: string;
    
    signature?: string;
    created?: Date;    
    update_created?: Date;
}