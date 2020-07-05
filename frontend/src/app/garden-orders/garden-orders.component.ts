import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StorageArticlsService } from 'src/services/StorageArticl/storage-articls.service';
import { ArticlInStorage } from 'src/models/atriclInStorage';
import { ArticlService } from 'src/services/articl/articl.service';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';
import { Subject } from 'rxjs';
import { OrderService } from 'src/services/order/order.service';
import { Order } from 'src/models/order';

@Component({
  selector: 'app-garden-orders',
  templateUrl: './garden-orders.component.html',
  styleUrls: ['./garden-orders.component.css']
})
export class GardenOrdersComponent implements OnInit, OnDestroy {

  gardenId: string;
  articlsObj: ArticlInStorage[];

  dtOptions: DataTables.Settings = {
    retrieve: true
  };

  dtTrigger: Subject<any> = new Subject();

  constructor(public router: Router,
              public storageArticlsService: StorageArticlsService,
              private articlService: ArticlService,
              private enterpriseService: EnterpriseService,
              private orderService: OrderService) {
                this.articlsObj = [];
               }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.gardenId = this.router.parseUrl(this.router.url).queryParams['gardenId'];

    this.storageArticlsService.getOrders(this.gardenId).subscribe(data=>{
      let orderes = data['orders'];
      let ids: String[] = [];
      for(let i = 0; i < orderes.length; i++){
        let order = orderes[i]['articlIds'];
        for(let j = 0; j < order.length; j++){
          let a: ArticlInStorage = {
            _id: null,
            gardenId: this.gardenId,
            articlId: order[j],
            enterprise: "",
            orderId: orderes[i]._id,
            articl: null,
            qnt: 1,
            status: orderes[i].status
          }
          this.articlsObj.push(a);
        }
      }
      this.getAllArticles(this.articlsObj);
    });
  }

  getAllArticles(articlIds: ArticlInStorage[]){
    console.log(articlIds);
    for(let i = 0; i < articlIds.length; i++){
      this.articlService.getById(articlIds[i].articlId).subscribe(data=>{
        articlIds[i].articl = data['articl'];
        this.enterpriseService.getById(articlIds[i].articl.enterpriseId.valueOf()).subscribe(data=>{
          let a = data['enterprise'].companyName;
          articlIds[i].enterprise = a;
          this.dtTrigger.next();
        })
      });
    }
  }

  shop(){
    this.router.navigate(['/shop'], {queryParams: {gardenId: this.gardenId}});
  }

  cancelOrder(orderId: String){
    this.orderService.cancelOrder(orderId.valueOf()).subscribe(data=>{

    })
  }
}
