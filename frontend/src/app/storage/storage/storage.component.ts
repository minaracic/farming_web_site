import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input } from '@angular/core';
import { GardenService } from 'src/services/Garden/garden.service';
import { Router } from '@angular/router';
import { ArticlInStorage } from 'src/models/atriclInStorage';
import { OrderService } from 'src/services/order/order.service';
import { Articl } from 'src/models/articl';
import { Observable, observable, Subject } from 'rxjs';
import { ArticlService } from 'src/services/articl/articl.service';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';
import { StorageArticlsService } from 'src/services/StorageArticl/storage-articls.service';
import { DataTableDirective } from 'angular-datatables';
import { GardenDetailsComponent } from 'src/app/garden-details/garden-details.component';
import { SeedService } from 'src/services/Seed/seed.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit, OnDestroy{

  gardenId: string;
  articlesObj1: ArticlInStorage[] = [];
  articlesObj2: ArticlInStorage[] = [];
  orderes: Articl[];

  dtOptions: DataTables.Settings = {
    retrieve: true
  };

  dtTrigger: Subject<any> = new Subject();

  constructor(public router: Router,
            protected enterpriseService: EnterpriseService,
            protected gardenService: GardenService,
            protected seedService: SeedService,
            protected orderService: OrderService,
            protected articleService: ArticlService,
            protected storageArticlsService: StorageArticlsService) {
              // this.gardenDetailsCmp = new GardenDetailsComponent(router, gardenService, seedService, orderService, articleService, enterpriseService);

              // this.gardenDetailsCmp.eventEmitter.on("articlesObj2", (data)=>{
              //   // this.articlesObj2 = data;
              //   console.log("articlesObj2", data);
              // })
            }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

    this.gardenId = this.router.parseUrl(this.router.url).queryParams['gardenId'];
    this.getStorage();
  }

  getStorage(){
    this.gardenService.getMyArticles(this.gardenId).subscribe(data=>{
      let articls = data['articls'];
      let ids: String[] = [];
      for(let i = 0; i < articls.length; i++){
        let a: ArticlInStorage = {
          enterprise: "",
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
      // this.dtTrigger.next();
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
          console.log(a);
          articlIds[i].enterprise = a;
          this.dtTrigger.next();
        })
      });
    }
  }

  seed(id: string){
    // this.storageArticlsService
  }

  myOrders(){
    this.router.navigate(['/gardenOrder'], {queryParams: {gardenId: this.gardenId}});
  }
}
