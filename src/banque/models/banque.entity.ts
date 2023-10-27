import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('banques')
export class Banque {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_banque: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    adresse: string;

    @OneToMany(() => Beneficiaire, (item) => item.cohorte, {cascade: true})
    beneficiaires: Beneficiaire[];
    
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}