import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity"; 
import { Remboursement } from "src/remboursement/models/remboursement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cohortes')
export class Cohorte {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_cohorte: string;

    @Column()
    contrat_ref: string; 

    @Column({default: 'Ouvert'})  // Ouvert et cloturer
    statut: string;

    @Column({default: '0'})
    montant_global: string;

    @OneToMany(() => Beneficiaire, (item) => item.cohorte, {cascade: true})
    beneficiaires: Beneficiaire[];

    @OneToMany(() => Remboursement, (item) => item.cohorte, {cascade: true})
    remboursements: Remboursement[];

    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}