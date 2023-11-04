import { Banque } from "src/banque/models/banque.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('remboursements')
export class Remboursement {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Cohorte, (item)=> item.remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    cohorte: Cohorte;

    @ManyToOne(() => Banque, (item)=> item.remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    banque: Banque;

    @ManyToOne(() => Beneficiaire, (item)=> item.remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    beneficiaire: Beneficiaire;

    @Column({default: '0'})
    montant_payer: string; // Un montant à ajouter chaque mois
    
    @Column()
    date_paiement: Date; 
    
    @Column({default: '-'})
    observation: string; 

    @Column()
    file_scan: string;
    
    @Column()
    signature: string; // Celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}