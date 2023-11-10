import { Banque } from "src/banque/models/banque.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";
import { PlanRemboursement } from "src/plan_remboursement/models/plan_remboursement.entity"; 
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('beneficiaires')
export class Beneficiaire {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    photo: string;

    @Column()
    name_beneficiaire: string;

    @Column()
    sexe: string;

    @Column()
    date_naissance: Date;

    @Column()
    province: string;

    @Column()
    identifiant: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    raison_sociale: string;

    @Column()
    secteur_activite: string;

    @Column()
    numero_impot: string;

    @Column()
    id_nat: string;

    @Column()
    rccm: string;

    @Column({default: '-'})
    adresse: string;
 
    // banque

    @Column({default: '0'})
    montant_garantie: string;

    @Column({default: '0'})
    credit_accorde: string;

    @Column({default: '0'})
    interet: string;

    @Column({default: '0'})
    montant_a_debourser: string; // Montant à rembourser

    // Date
    @Column({default: new Date()})
    delai_de_grace: Date;

    @Column({default: new Date()})
    delai_de_reajustement: Date;

    @Column({default: 0})
    duree_credit: number; // La durée de validité que le beneficiaire devra payé

    @Column({default: new Date()})
    date_valeur: Date; // Date à la quel on donné le credit

    @Column({default: new Date()})
    date_maturite: Date; // Date du dernier remboursement donc écheance 
 
    @Column({default: 'En cours'})  // En cours // Terminer
    statut: string;

    @ManyToOne(() => Cohorte, (item)=> item.beneficiaires, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    cohorte: Cohorte;

    @ManyToOne(() => Banque, (item)=> item.beneficiaires, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    banque: Banque; 

    @OneToMany(() => PlanRemboursement, (item) => item.beneficiaire, {cascade: true})
    plan_remboursements: PlanRemboursement[];
    
    @Column()
    signature: string; // Celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}