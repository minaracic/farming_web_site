import { Component, OnInit, Renderer2 } from '@angular/core';
import { Order } from 'src/models/order';
import { OrderService } from 'src/services/order/order.service';
import { Router } from '@angular/router';
import { Articl } from 'src/models/articl';
import { Enterprise } from 'src/models/enterprise';
import { ArticlService } from 'src/services/articl/articl.service';
import { Subject } from 'rxjs';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';
import { GoogleMapsService } from 'src/services/Google-maps/google-maps.service';
import { GardenService } from 'src/services/Garden/garden.service';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { Constats } from 'src/constants';
import { ArticlInStorage } from 'src/models/atriclInStorage';
import { StorageArticlsService } from 'src/services/StorageArticl/storage-articls.service';

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.css']
})
export class OrdersPreviewComponent implements OnInit {

  orders: Order[] = [];
  articls: Articl[] = [];
  enterprise: Enterprise;

  dtOptions: DataTables.Settings = {searching:false, retrieve:true};
  dtTrigger: Subject<any> = new Subject();

  constructor(public router: Router,
              private orderService: OrderService,
              private articlService: ArticlService,
              private articlInStorageService: StorageArticlsService,
              private gardenService: GardenService,
              private enterpriseService: EnterpriseService,
              private mapsService: GoogleMapsService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.enterprise = JSON.parse(localStorage.getItem('user'));
    this.orderService.getAllOrders().subscribe(data=>{
      let allOrders = data['orders'];
      for(let i = 0; i < allOrders.length; i++){
        let articlIds = allOrders[i].articlIds;

        for(let j = 0; j < articlIds.length; j++){

          this.articlService.getById(articlIds[j]).subscribe(data=>{

            if(data['articl'].enterpriseId == this.enterprise._id){
              this.orders.push(allOrders[i]);
              this.articls.push(data['articl']);
              if(j == 0){
                this.articls[this.articls.length - 1].showAcceptButton = true;
              }
              else{
                this.articls[this.articls.length - 1].showAcceptButton = false;
              }
              this.dtTrigger.next();
            }

          })
        }
      }
    });
  }

  acceptOrder(order: Order){
    console.log(order);
    if(order.status != 1)return;
    this.enterpriseService.getById(this.enterprise._id.valueOf()).subscribe(data=>{
      let availablePostman = data['enterprise'].availablePostman;
      if(availablePostman > 0){
        this.enterpriseService.getAPostman(this.enterprise._id.valueOf()).subscribe((data)=>{});
        this.orderService.updateStatus(order._id.valueOf(), 3).subscribe((data)=>{})

        this.calcTimeForOrder(order);
      }
      else{
        this.orderService.updateStatus(order._id.valueOf(), 2).subscribe((data)=>{})
      }
    })
    // this.ngOnInit();
  }

  calcTimeForOrder(order: Order){
    console.log("calcTimeForOrder");
    this.gardenService.getGarden(order.gardenId.valueOf()).subscribe(data=>{
      let from = this.enterprise.address.valueOf();
      let to = data['garden'].place;

      this.mapsService.getDistance(from, to).subscribe((data)=>{
        let time:String = data['time'].text;
        let times = time.split(" ");
        let totalMs = this.toMiliseconds(times);

        setTimeout(()=>{
          this.deliverOrder(order);
        }, totalMs);

      });
    })
  }

  deliverOrder(order: Order){
    console.log("Deliver order");
    let articlIds = order.articlIds;
    console.log(articlIds);
    for(let i = 0; i < articlIds.length; i++){
      let articl = {
        _id: null,
        gardenId: order.gardenId,
        qnt: 1,
        articlId: order.articlIds[i]
      }
      this.articlInStorageService.addArticl(articl).subscribe(data=>{});
    }
    this.orderService.updateStatus(order._id.valueOf(), 4).subscribe(data=>{})
    this.takeAnotherOrder();
  }

  takeAnotherOrder(){
    console.log("Take another order");
    this.enterpriseService.returnAPostman(this.enterprise._id.valueOf()).subscribe((data)=>{});
    for(let i = 0; i < this.orders.length; i++){
      if(this.orders[i].status == 2){
        this.acceptOrder(this.orders[i]);
      }
    }
  }

  toMiliseconds(times){
    console.log(times);
    let totalMs:number = 0;

    for(let i = 0; i < times.length-1; i++){
      let a:String = times[i+1];
      let num:String = times[i];
      if(a.includes("day")){
        totalMs += Number.parseInt(num.valueOf()) * Constats.dayToMs;
      }
      if(a.includes("min")){
        totalMs += Number.parseInt(num.valueOf()) * Constats.minToMs;
      }
      if(a.includes("hour")){
        totalMs += Number.parseInt(num.valueOf()) * Constats.hourToMs;
      }
    }

    return totalMs;
  }

  changeOrderStatus(orderId: string){
    let newStatus = confirm("Are you sure you want to deliver product now?");
    if(newStatus == true){
      this.orderService.updateStatus(orderId, 4).subscribe((data)=>{});
    }

  }

  cancelOrder(id: string){
    this.orderService.cancelOrder(id).subscribe(data=>{

    });
  }

  myArticls(){
    this.router.navigate(['/articls']);
  }

  statistic(){
    this.router.navigate(['/orderStatistic']);
  }
}
