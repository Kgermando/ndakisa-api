import { User } from "src/users/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('logs_users')
export class LogUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (item)=> item.logs, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;

    @Column()
    date_operation: Date;

    @Column()
    type_operation: string; // Create, Update, Delete

    @Column()
    module: string; // Beneficiaire, Cohorte, Banque, Utilisateurs

    @Column()
    title: string;  // Titre de l'objet

    @Column()
    observation: string; // Mise en corbeil
    
    // @Column()
    // signature: string; // Le user contient déjà les elements de la signature

    // @Column()
    // created: Date;

    // @Column()
    // update_created : Date;
}
