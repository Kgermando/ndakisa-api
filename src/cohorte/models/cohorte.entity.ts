import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity"; 
import { PlanRemboursement } from "src/plan_remboursement/models/plan_remboursement.entity"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cohortes')
export class Cohorte {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_cohorte: string;

    @Column()
    contrat_ref: string; 

    @Column({default: 'Ouverte'})  // Ouverte et Fermée
    statut_cohorte: string;

    @OneToMany(() => Beneficiaire, (item) => item.cohorte, {cascade: true})
    beneficiaires: Beneficiaire[];

    @OneToMany(() => PlanRemboursement, (item) => item.cohorte, {cascade: true})
    plan_remboursements: PlanRemboursement[];

    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;

    @Column({default: false})
    is_delete: boolean;

    @Column({default: 'Cohorte'})
    type: string;
}
