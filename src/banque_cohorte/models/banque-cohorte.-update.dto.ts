import { Banque } from "src/banque/models/banque.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class BanqueCohorteUpdateDto {
    banque?: Banque; 
    cohorte?: Cohorte;
    montant_garantie?: string;
    signature?: string;
    created?: Date;
    update_created?: Date;
}