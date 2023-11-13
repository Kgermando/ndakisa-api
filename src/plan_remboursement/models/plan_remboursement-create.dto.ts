import { IsNotEmpty } from "class-validator"; 
import { Banque } from "src/banque/models/banque.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class PlanRemboursementCreateDto { 
 
    @IsNotEmpty()
    cohorte: Cohorte;

    @IsNotEmpty()
    banque: Banque; 
    
    @IsNotEmpty()
    beneficiaire: Beneficiaire; 

    @IsNotEmpty()
    date_de_rembousement: Date;

    delai_reajustement: number;

    @IsNotEmpty()
    credit_en_debut_periode: string; 
    
    interet: string;

    capital: string;  

    montant_payer: string; // Un montant à ajouter chaque mois
     
    observation: string;

    date_paiement: Date; 

    file_scan: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}