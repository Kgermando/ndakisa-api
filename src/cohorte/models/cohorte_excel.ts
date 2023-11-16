export interface CohorteExcel {
    name_cohorte: string;
    contrat_ref: string;
    statut_cohorte: string;
    name_banque: string;
    name_beneficiaire: string;
    sexe: string;
    date_naissance: Date;
    province: string;
    identifiant: string;
    email: string;
    telephone: string;
    raison_sociale: string;
    name_secteur: string; 
    numero_impot: string;
    id_nat: string;
    rccm: string;
    compte_bancaire: string;
    adresse: string;
    montant_garantie: string;
    credit_accorde: string;
    interet: string;
    montant_a_debourser: string;
    delai_de_grace: number;
    duree_credit: number;
    date_valeur: Date;
    date_maturite: Date; // Date du dernier remboursement donc écheance 
    statut: string;
}