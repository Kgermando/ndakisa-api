import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity"; 
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class Notify {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Beneficiaire, (item)=> item.notifications, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    beneficiaire: Beneficiaire;

    @Column()
    rappel: boolean; 

    @Column()
    observation: string;  

    @Column()
    signature: string; // Celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}
