import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cohortes')
export class Cohorte {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_cohorte: string;

    @Column({default: '0'})
    effectif: string;

    @Column({default: 'Ouvert'})  // Ouvert et cloturer
    statut: string;

    @Column()
    identifiant: string;

    @Column({default: '0'})
    montant_global: string;
    
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created : Date;
}