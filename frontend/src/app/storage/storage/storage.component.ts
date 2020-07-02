import { Component, OnInit, OnDestroy } from '@angular/core';
import { GardenService } from 'src/services/Garden/garden.service';
import { Router } from '@angular/router';
import { ArticlInStorage } from 'src/models/atriclInStorage';
import { OrderService } from 'src/services/order/order.service';
import { Articl } from 'src/models/articl';
import { Observable, observable, Subject } from 'rxjs';
import { ArticlService } from 'src/services/articl/articl.service';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit, OnDestroy {

  gardenId: string;
  articlesObj1: ArticlInStorage[];
  articlesObj2: ArticlInStorage[];
  orderes: Articl[];

  dtOptions: DataTables.Settings = { retrieve: true};
  dtTrigger: Subject<any> = new Subject();

  constructor(public router: Router, private enterpriseService: EnterpriseService, private gardenService: GardenService, private orderService: OrderService, private articleService: ArticlService) {

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.articlesObj1 = [];
    this.articlesObj2 = [];
    this.gardenId = this.router.parseUrl(this.router.url).queryParams['gardenId'];

    this.getStorage();

  }

  getStorage(){
    this.gardenService.getMyArticles(this.gardenId).subscribe(data=>{
      let articls = data['articls'];
      let ids: String[] = [];
      for(let i = 0; i < articls.length; i++){
        let a: ArticlInStorage = {
          gardenId: this.gardenId,
          articlId: articls[i].articlId,
          articl: null,
          orderId: null,
          qnt: articls[i].qnt,
          status: 4
        }
        this.articlesObj2.push(a);
      }
      this.getAllArticles(this.articlesObj2);
    });

    this.orderService.getOrdersFromGarden(this.gardenId).subscribe(data=>{
      let orderes = data['orders'];
      let ids: String[] = [];
      for(let i = 0; i < orderes.length; i++){
        let order = orderes[i]['articlIds'];
        for(let j = 0; j < order.length; j++){
          let a: ArticlInStorage = {
            gardenId: this.gardenId,
            articlId: order[j],
            orderId: orderes[i]._id,
            articl: null,
            qnt: 1,
            status: orderes[i].status
          }
          this.articlesObj1.push(a);
        }
      }
      this.getAllArticles(this.articlesObj1);
    });


  }

  cancelOrder(orderId: String){
    this.orderService.cancelOrder(orderId.valueOf()).subscribe(data=>{

    })
  }

  shop(){
    this.router.navigate(['/shop'], {queryParams: {gardenId: this.gardenId}});
  }

  getAllArticles(articlIds: ArticlInStorage[]){
    console.log(articlIds);
    for(let i = 0; i < articlIds.length; i++){
      this.articleService.getById(articlIds[i].articlId).subscribe(data=>{
        articlIds[i].articl = data['articl'];

        this.enterpriseService.getById(articlIds[i].articl.enterpriseId.valueOf()).subscribe(data=>{
          let a = data['enterprise'].companyName;
        //  articlIds[i].articl.enterprise = a;

          this.dtTrigger.next();

        })
      });
    }
  }

}
