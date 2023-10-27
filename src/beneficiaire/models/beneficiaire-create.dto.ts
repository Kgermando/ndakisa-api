import { IsNotEmpty } from "class-validator";
import { Banque } from "src/banque/models/banque.entity"; 
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class BeneficiaireCreateDto { 

    @IsNotEmpty()
    name_beneficiaire: string;

 
    raison_sociale: string;

    @IsNotEmpty()
    adresse: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    identifiant: string;

    @IsNotEmpty()
    province: string;

    @IsNotEmpty()
    sexe: string;

    @IsNotEmpty()
    age: string;

    @IsNotEmpty()
    secteur_activite: string;
 
    numero_impot: string;

    id_nat: string;
 
    rccm: string;

    // banque

    montant_garantie: string;

    credit_accorde: string;

    interet: string;
 
    montant_a_debourser: string;
 
    delai_de_grace: Date;
 
    duree_credit: Date; // La durée de validité que le beneficiaire devra payé

    date_valeur: Date; // Date à la quel on donné le credit
 
    date_maturite: Date; // Date du dernier remboursement donc écheance 
 
    date_de_rembousement: Date; // Date de remboursement à la banque doit etre ajustable
  
    cohorte: Cohorte;
 
    banque: Banque;
 
    statut: string;

    montant_payer: string; // Un montant à ajouter chaque mois
     
    Observation: string;

    file_scan: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}