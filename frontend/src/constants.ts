import { User } from './models/user';

export class Constats{
  public static URI: String = "http://localhost:4000";
}

export interface LogInRes{
  message: string
  user: User,
}
