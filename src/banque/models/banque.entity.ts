import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Remboursement } from "src/remboursement/models/remboursement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('banques')
export class Banque {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_banque: string; 

    @OneToMany(() => Beneficiaire, (item) => item.banque, {cascade: true})
    beneficiaires: Beneficiaire[];

    @OneToMany(() => Remboursement, (item) => item.banque, {cascade: true})
    remboursements: Remboursement[];
    
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}