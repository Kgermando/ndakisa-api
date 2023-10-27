import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class BanqueUpdateDto {
    name_banque?: string; 
    email?: string;
    telephone?: string;
    adresse?: string;
    beneficiaires?: Beneficiaire[];
    signature?: string;
    created?: Date;
    update_created?: Date;
}