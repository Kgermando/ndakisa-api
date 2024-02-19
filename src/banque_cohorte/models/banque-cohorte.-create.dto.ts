import { IsNotEmpty } from "class-validator";
import { Banque } from "src/banque/models/banque.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class BanqueCohorteCreateDto { 

    @IsNotEmpty()
    banque: Banque; 

    @IsNotEmpty()
    cohorte: Cohorte;

    @IsNotEmpty()
    montant_garantie: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}