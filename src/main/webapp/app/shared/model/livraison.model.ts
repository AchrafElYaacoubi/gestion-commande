import { Moment } from 'moment';
import { ICommande } from 'app/shared/model//commande.model';

export interface ILivraison {
  id?: number;
  date?: Moment;
  commande?: ICommande;
}

export const defaultValue: Readonly<ILivraison> = {};
