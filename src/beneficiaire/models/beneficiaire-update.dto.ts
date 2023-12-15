import { Banque } from "src/banque/models/banque.entity"; 
import { Cohorte } from "src/cohorte/models/cohorte.entity";
import { Secteur } from "src/secteurs/models/secteur.entity";

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
    secteur_activite?: Secteur;
    numero_impot?: string;
    id_nat?: string;
    rccm?: string;
    compte_bancaire?: string;
    adresse?: string;
    
    // banque
    montant_garantie?: string;
    credit_accorde?: string;
    interet_beneficiaire?: string;
    montant_a_debourser?: string;

    delai_de_grace?: number; 
    duree_credit?: number; // La durée de validité que le beneficiaire devra payé
    date_soumission?: Date; // Date à la quel on a soumis le dossier à la banque
    date_valeur?: Date; // Date à la quel on donné le credit
    date_maturite?: Date; // Date du dernier remboursement donc écheance 
    
    statut?: string; 
    systeme_remboursement?: string; // Lineaire // Progrssif

    cohorte?: Cohorte;
    banque?: Banque; 
    
    signature?: string;
    created?: Date;    
    update_created?: Date;
    
    is_delete?: boolean;
}