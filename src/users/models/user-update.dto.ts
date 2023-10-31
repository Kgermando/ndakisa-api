export class UserUpdateDto {
    photo?: string; 
    nom?: string;
    postnom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
    adresse?: string;
    sexe?: string;
    matricule?: string; 
    title?: string;
    statut_user?: boolean;
    roles?: string[];
    permission?: string;
    signature?: string;
    created?: Date;
    update_created?: Date;
}