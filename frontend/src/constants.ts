import { User } from './models/user';

export class Constats{
  public static URI: String = "http://localhost:4000";
  public static harvestTimeout = 24*60*60*1000;
}

export interface LogInRes{
  message: string
  user: User,
}
