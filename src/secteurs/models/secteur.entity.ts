 
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('secteurs')
export class Secteur {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_secteur: string; 
 
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created : Date;
}