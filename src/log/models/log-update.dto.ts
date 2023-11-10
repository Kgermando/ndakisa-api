import { User } from "src/users/models/user.entity";

export class LogUpdateDto {
    user?: User; 
    type_operation?: string;
    date_operation?: Date;
    signature?: string;
    created?: Date;
    update_created?: Date;
}