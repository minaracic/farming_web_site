import { Articl } from './articl';

export interface ArticlInStorage{
  _id: String,
  gardenId: String,
  articlId: String,
  enterprise:String,
  orderId: String,
  articl: Articl,
  status: Number,
  qnt: Number
}
