import { Beneficiaire } from "src/beneficiaire/models/beneficiaire.entity"; 
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class Notify {
    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => Beneficiaire, (item)=> item.notifications, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    beneficiaire: Beneficiaire;

    @Column()
    rappel_1: boolean; 

    @Column()
    observation_1: string; 

    @Column()
    rappel_2: boolean; 

    @Column()
    observation_2: string; 

    @Column()
    rappel_3: boolean; 

    @Column()
    observation_3: string; 

    @Column()
    rappel_4: boolean; 

    @Column()
    observation_4: string; 

    @Column()
    rappel_5: boolean; 

    @Column()
    observation_5: string; 

    @Column()
    rappel_6: boolean; 

    @Column()
    observation_6: string; 

    @Column()
    rappel_7: boolean; 

    @Column()
    observation_7: string;   

    @Column()
    signature: string; // Celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created: Date;
}
