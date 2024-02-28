import { IsNotEmpty } from "class-validator";  
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class NotifyCreateDto { 
    
    @IsNotEmpty()
    beneficiaire: Beneficiaire; 

    @IsNotEmpty()
    rappel_1: boolean; 

    @IsNotEmpty()
    observation_1: string; 

    @IsNotEmpty()
    rappel_2: boolean; 

    @IsNotEmpty()
    observation_2: string; 

    @IsNotEmpty()
    rappel_3: boolean; 

    @IsNotEmpty()
    observation_3: string; 

    @IsNotEmpty()
    rappel_4: boolean; 

    @IsNotEmpty()
    observation_4: string; 

    @IsNotEmpty()
    rappel_5: boolean; 

    @IsNotEmpty()
    observation_5: string; 

    @IsNotEmpty()
    rappel_6: boolean; 

    @IsNotEmpty()
    observation_6: string; 

    @IsNotEmpty()
    rappel_7: boolean; 

    @IsNotEmpty()
    observation_7: string; 

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}