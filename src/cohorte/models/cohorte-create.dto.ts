import { IsNotEmpty } from "class-validator";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class CohorteCreateDto { 

    @IsNotEmpty()
    name_cohorte: string;

    @IsNotEmpty()
    contrat_ref: string;

    statut: string;

    @IsNotEmpty()
    montant_global: string; 

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}