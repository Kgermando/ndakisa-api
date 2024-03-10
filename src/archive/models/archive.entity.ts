import { BanqueCohorte } from "src/banque_cohorte/models/banque-cohorte.entity";
import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { PlanRemboursement } from "src/plan_remboursement/models/plan_remboursement.entity"; 
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('archives')
export class Archive {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    archive_url: string; 
    
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}