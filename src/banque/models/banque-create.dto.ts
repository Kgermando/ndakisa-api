import { IsNotEmpty } from "class-validator";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class BanqueCreateDto { 

    @IsNotEmpty()
    name_banque: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}