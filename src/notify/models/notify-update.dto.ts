import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class NotifyUpdateDto {
    beneficiaire?: Beneficiaire;
    rappel?: boolean;
    observation?: string;
    signature?: string;
    created?: Date;    
    update_created?: Date;
}