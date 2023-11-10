import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "src/users/models/user.entity";

export class LogCreateDto { 

    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    type_operation: string;

    @IsNotEmpty()
    date_operation: Date; 

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created : Date;
}