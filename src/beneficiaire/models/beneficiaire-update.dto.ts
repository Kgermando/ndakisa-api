import { Banque } from "src/banque/models/banque.entity"; 
import { Cohorte } from "src/cohorte/models/cohorte.entity";

export class BeneficiaireUpdateDto { 
    photo?: string;
    name_beneficiaire?: string;
    sexe?: string;
    date_naissance?: Date;
    province?: string;
    identifiant?: string;
    email?: string;
    telephone?: string;
    raison_sociale?: string;
    secteur_activite?: string;
    numero_impot?: string;
    id_nat?: string;
    rccm?: string;
    adresse?: string; 
    
    // banque
    montant_garantie?: string;
    credit_accorde?: string;
    interet?: string;
    montant_a_debourser?: string;

    delai_de_grace?: Date;
    delai_de_reajustement?: Date;
    duree_credit?: number; // La durée de validité que le beneficiaire devra payé
    date_valeur?: Date; // Date à la quel on donné le credit
    date_maturite?: Date; // Date du dernier remboursement donc écheance 
    
    cohorte?: Cohorte;
    banque?: Banque;
    statut?: string; 
    signature?: string;
    created?: Date;    
    update_created?: Date;
}