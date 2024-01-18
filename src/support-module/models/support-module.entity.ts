import { SupportDoc } from "src/support/models/support.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('supports_modules')
export class SupportModuleDoc {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    module: string;  

    @OneToMany(() => SupportDoc, (item) => item.module, {cascade: true})
    supports: SupportDoc[];

    @Column()
    created: Date;

    @Column()
    update_created : Date;
}