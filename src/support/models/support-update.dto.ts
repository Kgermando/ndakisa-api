import { SupportModuleDoc } from "src/support-module/models/support-module.entity";

export class SupportUpdateDto {
    module?: SupportModuleDoc; 
    section?: string; 
    documentation?: string; 
    created?: Date;
    update_created?: Date;
}