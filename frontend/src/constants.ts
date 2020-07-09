import { User } from './models/user';

export class Constats{
  public static URI: String = "http://localhost:4000";
  public static harvestTimeout = 24*60*60*1000;
  public static mapsAPI = "https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686"
  public static mapsKey = "z2Vw1aIZ2dZeL2AabN5Nq3-Q2PfWKIRUDTa9w09H2p4";

  public static harvestTime = 24*60*60*1000;
  public static gardenUpdateTime = 60*60*1000;
  public static seedGrowTime = 24*60*60*1000;

  public static dayToMs: number = 24*60*60*1000;
  public static minToMs: number = 60*1000;
  public static hourToMs: number = 60*60*1000;
}

export interface LogInRes{
  message: string
  user: User,
}

export interface Statistic{
  date: String,
  total: number
}
