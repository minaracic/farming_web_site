import { Articl } from './articl';

export interface ArticlInStorage{
  gardenId: String,
  articlId: String,
  articl: Articl,
  qnt: Number,
  hasArrived: Boolean
}
