import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class BanqueUpdateDto {
    name_banque?: string;
    signature?: string;
    created?: Date;
    update_created?: Date;
}