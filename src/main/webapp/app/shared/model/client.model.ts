import { ICommande } from 'app/shared/model//commande.model';

export interface IClient {
  id?: number;
  nom?: string;
  prenom?: string;
  adresse?: string;
  telephone?: number;
  commandes?: ICommande[];
}

export const defaultValue: Readonly<IClient> = {};
