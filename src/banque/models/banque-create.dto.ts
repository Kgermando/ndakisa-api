import { IsNotEmpty } from "class-validator";

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