import { Injectable } from '@angular/core';
import { EnterpriseService } from '../Enterprise/enterprise.service';
import { ArticlInStorage } from 'src/models/atriclInStorage';
import { GardenService } from '../Garden/garden.service';
import { ArticlService } from '../articl/articl.service';
import { OrderService } from '../order/order.service';
import { Constats } from 'src/constants';
import { HttpClient } from '@angular/common/http';
import { Seed } from 'src/models/seed';

@Injectable({
  providedIn: 'root'
})
export class StorageArticlsService {

  articlsObj1: ArticlInStorage[];
  articlsObj2: ArticlInStorage[];


  constructor(private http: HttpClient,
              private gardenService: GardenService,
              private articlService: ArticlService,
              private orderService: OrderService) {
                this.articlsObj1 = [];
                this.articlsObj2 = [];
               }

  getStorage(gardenId: string){
    return this.gardenService.getMyArticles(gardenId);
  }

  getOrders(gardenId: string){
    return this.orderService.getOrdersFromGarden(gardenId);
  }

  // getEnteprise(articls: ArticlInStorage[]){
  //   for(let i = 0; i < articls.length; i++){
  //     this.enterpriseService.getById(articls[i].articl.enterpriseId.valueOf()).subscribe(data=>{
  //       let a = data['enterprise'].companyName;
  //       articls[i].enterprise = a;
  //     })
  //   }
  // }

  getSeed(articlId: string){
    let req={
      articlId: articlId
    }
    return this.http.post(`${Constats.URI}/getSeedFromStorage`, req);
  }

  plantSeed(gardenId: string, articl: ArticlInStorage){
    let s:Seed = {
      _id: null,
      gardenId: gardenId,
      harvested: false,
      name: articl.articl.name,
      producerId: articl.articl.enterpriseId,
      totalGrowDays: articl.articl.totalGrowDays,
      producer: "",
      progress: 0,
      garden: ""
    }
    let req={
      s: s
    }
    return this.http.post(`${Constats.URI}/plantASeed`, req);
  }


}
