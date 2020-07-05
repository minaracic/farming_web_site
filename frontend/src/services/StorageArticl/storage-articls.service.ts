import { Injectable } from '@angular/core';
import { EnterpriseService } from '../Enterprise/enterprise.service';
import { ArticlInStorage } from 'src/models/atriclInStorage';
import { GardenService } from '../Garden/garden.service';
import { ArticlService } from '../articl/articl.service';
import { OrderService } from '../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class StorageArticlsService {

  articlsObj1: ArticlInStorage[];
  articlsObj2: ArticlInStorage[];


  constructor(private enterpriseService: EnterpriseService,
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

  getEnteprise(articls: ArticlInStorage[]){
    for(let i = 0; i < articls.length; i++){
      this.enterpriseService.getById(articls[i].articl.enterpriseId.valueOf()).subscribe(data=>{
        let a = data['enterprise'].companyName;
        articls[i].enterprise = a;
      })
    }
  }

}
