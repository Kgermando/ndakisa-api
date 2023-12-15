import { Exclude } from "class-transformer";
import { LogUser } from "src/log/models/log.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    photo: string;

    @Column()
    nom: string;

    @Column()
    postnom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    adresse: string;

    @Column()
    sexe: string;

    // Accès
    @Column({unique : true})
    matricule: string;

    @Column({default: '-'})
    title: string;

    // Sécurité
    @Column({default: false})
    statut_user: boolean;

    @Column('simple-array', { nullable: true })
    roles: string[];
    
    @Column({nullable: true})
    permission: string;  // Give access to CRUD  [Create, Read, Update, Delete] C R U D

    @OneToMany(() => LogUser, (item) => item.user, {cascade: true})
    logs: LogUser[];

    @Column()
    @Exclude()
    password: string;
 
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created : Date;

    @Column({default: false})
    is_delete: boolean;

    @Column({default: 'Utilisateur'})
    type: string;
}