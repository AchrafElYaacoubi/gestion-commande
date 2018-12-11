import { ICommande } from 'app/shared/model//commande.model';

export interface IProduit {
  id?: number;
  nom?: string;
  quantite?: number;
  prix?: number;
  commandes?: ICommande[];
}

export const defaultValue: Readonly<IProduit> = {};
