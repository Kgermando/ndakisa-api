import { IsNotEmpty } from "class-validator"; 
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class PlanRemboursementCreateDto { 
 
    @IsNotEmpty()
    beneficiaire: Beneficiaire; 

    @IsNotEmpty()
    date_de_rembousement: Date;

    @IsNotEmpty()
    credit_en_debut_periode: string;

    @IsNotEmpty()
    mensualite: string;
    
    interet: string;

    capital: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}