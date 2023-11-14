import { User } from "src/users/models/user.entity";

export class LogUpdateDto {
    user?: User;
    date_operation?: Date;
    type_operation?: string;
    module?: string;
    title?: string;
    observation?: string;
}