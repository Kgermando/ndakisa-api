import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cohortes')
export class Cohorte {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_cohorte: string;

    @Column()
    contrat_ref: string;

    @Column({default: '0'})
    effectif: string;

    @Column({default: 'Ouvert'})  // Ouvert et cloturer
    statut: string;

    @Column({default: '0'})
    montant_global: string;

    @OneToMany(() => Beneficiaire, (item) => item.cohorte, {cascade: true})
    beneficiaires: Beneficiaire[];

    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}