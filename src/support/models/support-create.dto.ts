import { IsNotEmpty } from "class-validator"; 
import { SupportModuleDoc } from "src/support-module/models/support-module.entity";

export class SupportCreateDto { 
    @IsNotEmpty()
    module: SupportModuleDoc; 

    @IsNotEmpty()
    section: string;   

    @IsNotEmpty()
    documentation: string; 

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date; 
}