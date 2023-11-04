import { IsNotEmpty } from "class-validator";
import { Banque } from "src/banque/models/banque.entity"; 
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class BeneficiaireCreateDto { 

    photo: string;

    @IsNotEmpty()
    name_beneficiaire: string;

    @IsNotEmpty()
    sexe: string;

    @IsNotEmpty()
    date_naissance: Date;

    @IsNotEmpty()
    province: string;

    @IsNotEmpty()
    identifiant: string;
    
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    telephone: string;

    raison_sociale: string;

    @IsNotEmpty()
    secteur_activite: string;

    numero_impot: string;

    id_nat: string;
 
    rccm: string;

    @IsNotEmpty()
    adresse: string;
 
    // banque
    montant_garantie: string;

    credit_accorde: string;

    interet: string;
 
    montant_a_debourser: string;
 
    delai_de_grace: Date;

    delai_de_reajustement: Date;
 
    duree_credit: number; // La durée de validité que le beneficiaire devra payé

    date_valeur: Date; // Date à la quel on donné le credit
 
    date_maturite: Date; // Date du dernier remboursement donc écheance 

    cohorte: Cohorte;
 
    banque: Banque;
 
    statut: string; 

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}