import { IsNotEmpty } from "class-validator";

export class ArchiveCreateDto { 

    @IsNotEmpty()
    archive_url: string; 

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}