import { Banque } from "src/banque/models/banque.entity";
import { Cohorte } from "src/cohorte/models/cohorte.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('banque_cohortes')
export class BanqueCohorte {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Banque, (item)=> item.banque_cohortes, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    banque: Banque; 

    @ManyToOne(() => Cohorte, (item)=> item.banque_cohortes, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    cohorte: Cohorte;

    @Column({default: '0'})
    montant_garantie: string;
    
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}