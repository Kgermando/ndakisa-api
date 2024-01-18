import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SupportModuleDoc } from "src/support-module/models/support-module.entity";

@Entity('supports')
export class SupportDoc {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SupportModuleDoc, (item)=> item.supports, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    module: SupportModuleDoc;

    @Column()    
    section: string;
    
    @Column()
    documentation: string;

    @Column()
    created: Date;

    @Column()
    update_created : Date;
}