import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('plan_remboursements')
export class PlanRemboursement {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Beneficiaire, (item)=> item.plan_remboursements, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    beneficiaire: Beneficiaire;
 
    @Column({default: new Date()})
    date_de_rembousement: Date; // Date de remboursement à la banque doit etre ajustable

    @Column()
    credit_en_debut_periode: string;

    @Column()
    mensualite: string;

    @Column()
    interet: string;

    @Column()
    capital: string;

    @Column()
    signature: string; // Celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}