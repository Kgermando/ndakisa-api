import { Banque } from "src/banque/models/banque.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('plan_remboursements')
export class PlanRemboursement {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cohorte, (item)=> item.plan_remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    cohorte: Cohorte;

    @ManyToOne(() => Banque, (item)=> item.plan_remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    banque: Banque;

    @ManyToOne(() => Beneficiaire, (item)=> item.plan_remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    beneficiaire: Beneficiaire;
 
    @Column({default: new Date()})
    date_de_rembousement: Date; // Date de remboursement à la banque doit etre ajustable

    @Column()
    credit_en_debut_periode: string;

    @Column({default: '0'})
    mensualite: string;

    @Column({default: '0'})
    interet: string;

    @Column({default: '0'})
    capital: string;

    @Column({default: '0'})
    montant_payer: string; // Un montant à ajouter chaque mois
    
    @Column({default: new Date()})
    date_paiement: Date;
    
    @Column({default: '-'})
    observation: string;

    @Column({default: '-'})
    file_scan: string;

    @Column()
    signature: string; // Celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}