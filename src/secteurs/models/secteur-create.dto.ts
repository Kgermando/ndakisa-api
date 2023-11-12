import { IsNotEmpty } from "class-validator";

export class SecteurCreateDto { 

    @IsNotEmpty()
    name_secteur: string; 

    @IsNotEmpty()
    statut: boolean;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date;
}