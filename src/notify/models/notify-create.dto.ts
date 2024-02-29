import { IsNotEmpty } from "class-validator";  
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class NotifyCreateDto { 
    
    @IsNotEmpty()
    beneficiaire: Beneficiaire; 

    @IsNotEmpty()
    rappel: boolean; 

    @IsNotEmpty()
    observation: string; 

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}