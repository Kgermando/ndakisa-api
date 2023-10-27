import { Banque } from "src/banque/models/banque.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('beneficiaires')
export class Beneficiaire {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name_beneficiaire: string;

    @Column()
    raison_sociale: string;

    @Column({default: '-'})
    adresse: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    identifiant: string;

    @Column()
    province: string;

    @Column()
    sexe: string;

    @Column()
    age: string;

    @Column()
    secteur_activite: string;

    @Column()
    numero_impot: string;

    @Column()
    id_nat: string;

    @Column()
    rccm: string;


    // banque

    @Column({default: '0'})
    montant_garantie: string;

    @Column({default: '0'})
    credit_accorde: string;

    @Column({default: '0'})
    interet: string;

    @Column({default: '0'})
    montant_a_debourser: string;

    @Column()
    delai_de_grace: Date;

    @Column()
    duree_credit: Date; // La durée de validité que le beneficiaire devra payé

    @Column()
    date_valeur: Date; // Date à la quel on donné le credit

    @Column()
    date_maturite: Date; // Date du dernier remboursement donc écheance 

    @Column()
    date_de_rembousement: Date; // Date de remboursement à la banque doit etre ajustable

    @ManyToOne(() => Cohorte, (item)=> item.beneficiaires, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    cohorte: Cohorte;

    @ManyToOne(() => Banque, (item)=> item.beneficiaires, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    banque: Banque;

    @Column({default: 'En attente'})  // En cours // Terminer
    statut: string;

    @Column({default: '0'})
    montant_payer: string; // Un montant à ajouter chaque mois
    
    @Column({default: '-'})
    Observation: string;

    @Column()
    file_scan: string;
    
    @Column()
    signature: string; // Celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}