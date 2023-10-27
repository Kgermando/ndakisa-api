import { IsNotEmpty } from "class-validator";

export class CohorteCreateDto { 

    @IsNotEmpty()
    name_cohorte: string;

    // @IsNotEmpty()
    effectif: string;

    // @IsNotEmpty()
    statut: string;

    @IsNotEmpty()
    identifiant: string;

    @IsNotEmpty()
    montant_global: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date;
}