import { IsNotEmpty } from "class-validator";

export class BanqueCreateDto { 

    @IsNotEmpty()
    name_banque: string;
 
    email: string;
 
    telephone: string;
 
    adresse: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date;
}