import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created : Date;
}