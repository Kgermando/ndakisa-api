import { Banque } from "src/banque/models/banque.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";
import { Secteur } from "src/secteurs/models/secteur.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('plan_remboursements')
export class PlanRemboursement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    id_db_banque: number;

    @ManyToOne(() => Cohorte, (item)=> item.plan_remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    cohorte: Cohorte;

    @ManyToOne(() => Banque, (item)=> item.plan_remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    banque: Banque;

    @ManyToOne(() => Beneficiaire, (item)=> item.plan_remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    beneficiaire: Beneficiaire;

    @ManyToOne(() => Secteur, (item)=> item.plan_remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    secteur_activite: Secteur;
 
    @Column({default: new Date()})
    date_de_rembousement: Date; // Date de remboursement à la banque doit etre ajustable

    @Column({default: '0'})
    delai_reajustement: number;

    @Column()
    credit_en_debut_periode: string;

    @Column({default: '0'})
    interet: string;

    @Column({default: '0'})
    capital: string;

    @Column({default: '0'})
    montant_payer: string; // Un montant à ajouter chaque mois
    
    @Column({nullable: true})
    date_paiement: Date;
    
    @Column({default: 'RAS'})
    observation: string;

    @Column({nullable: true})
    numero_transaction: string;

    @Column()
    signature: string; // Celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}