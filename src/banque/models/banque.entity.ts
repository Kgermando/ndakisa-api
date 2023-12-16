import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { PlanRemboursement } from "src/plan_remboursement/models/plan_remboursement.entity"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('banques')
export class Banque {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_banque: string; 

    @Column({default: true})
    statut: boolean;  // True => la Banque est activé AND False => la Banque est bloqué

    @OneToMany(() => Beneficiaire, (item) => item.banque, {cascade: true})
    beneficiaires: Beneficiaire[];

    @OneToMany(() => PlanRemboursement, (item) => item.banque, {cascade: true})
    plan_remboursements: PlanRemboursement[];
    
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}