 
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { PlanRemboursement } from "src/plan_remboursement/models/plan_remboursement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('secteurs')
export class Secteur {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_secteur: string; 

    @Column({default: true})
    statut: boolean;  // True => le secteur est activé AND False => le secteur est bloqué

    @OneToMany(() => Beneficiaire, (item) => item.secteur_activite, {cascade: true})
    beneficiaires: Beneficiaire[];

    @OneToMany(() => PlanRemboursement, (item) => item.beneficiaire, {cascade: true})
    plan_remboursements: PlanRemboursement[]; 
 
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created : Date;
}