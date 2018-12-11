import { Moment } from 'moment';
import { ICommande } from 'app/shared/model//commande.model';

export interface IFacture {
  id?: number;
  date?: Moment;
  montant?: number;
  commande?: ICommande;
}

export const defaultValue: Readonly<IFacture> = {};
