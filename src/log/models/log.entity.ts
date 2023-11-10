import { User } from "src/users/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('logs_users')
export class LogUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (item)=> item.logs, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    user: User;

    @Column()
    type_operation: string;

    @Column()
    date_operation: Date;
 
    @Column()
    signature: string; // celui qui fait le document

    @Column()
    created: Date;

    @Column()
    update_created : Date;
}
