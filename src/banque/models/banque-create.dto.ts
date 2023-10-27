import { IsNotEmpty } from "class-validator";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class BanqueCreateDto { 

    @IsNotEmpty()
    name_banque: string;
 
    email: string;
 
    telephone: string;
 
    adresse: string;

    beneficiaires: Beneficiaire[];

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}