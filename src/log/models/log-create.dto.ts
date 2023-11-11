import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "src/users/models/user.entity";

export class LogCreateDto { 

    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    date_operation: Date; 

    @IsNotEmpty()
    type_operation: string;

    @IsNotEmpty()
    module: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    observation: string;

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date;
}