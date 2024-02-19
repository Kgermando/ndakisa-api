
export class CohorteUpdateDto {
    name_cohorte?: string; 
    contrat_ref?: string; 
    statut_cohorte?: string;
    signature?: string;
    created?: Date;
    update_created?: Date;

    is_delete?: boolean;
}