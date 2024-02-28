import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";

export class NotifyUpdateDto {
    beneficiaire?: Beneficiaire;
    rappel_1?: boolean;
    observation_1?: string;
    rappel_2?: boolean;
    observation_2?: string;
    rappel_3?: boolean;
    observation_3?: string;
    rappel_4?: boolean;
    observation_4?: string;
    rappel_5?: boolean;
    observation_5?: string;
    rappel_6?: boolean;
    observation_6?: string;
    rappel_7?: boolean;
    observation_7?: string;
    signature?: string;
    created?: Date;    
    update_created?: Date;
}