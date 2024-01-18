import { IsNotEmpty } from "class-validator"; 

export class SupportModuleDocCreateDto { 
    @IsNotEmpty()
    module: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date; 
}