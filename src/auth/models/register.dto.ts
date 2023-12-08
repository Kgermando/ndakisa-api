import { IsNotEmpty } from "class-validator";

export class RegisterDto {
   
    photo: string;  

    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    postnom: string;

    @IsNotEmpty()
    prenom: string;

    @IsNotEmpty() 
    email: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    adresse: string;

    @IsNotEmpty()
    sexe: string;
  
    @IsNotEmpty()
    matricule: string; 

    statut_user: boolean;

    roles: string[];
    
    permission: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_confirm: string; 

    @IsNotEmpty()
    signature: string;

    @IsNotEmpty()
    created: Date;

    @IsNotEmpty()
    update_created: Date;
}