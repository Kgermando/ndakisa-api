import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class CohorteUpdateDto {
    name_cohorte?: string; 
    contrat_ref?: string; 
    statut?: string;
    montant_global?: string;
    beneficiaires?: Beneficiaire[];
    signature?: string;
    created?: Date;
    update_created?: Date;
}