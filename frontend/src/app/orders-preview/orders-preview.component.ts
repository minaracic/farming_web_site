import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order';
import { OrderService } from 'src/services/order/order.service';
import { Router } from '@angular/router';
import { Articl } from 'src/models/articl';
import { Enterprise } from 'src/models/enterprise';
import { ArticlService } from 'src/services/articl/articl.service';
import { Subject } from 'rxjs';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';
import { GoogleMapsService } from 'src/services/Google-maps/google-maps.service';

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
              public orderService: OrderService,
              public articlService: ArticlService,
              public enterpriseService: EnterpriseService,
              public mapsService: GoogleMapsService) { }

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
            this.dtTrigger.next();
            if(data['articl'].enterpriseId == this.enterprise._id){
              this.orders.push(allOrders[i]);
              this.articls.push(data['articl']);

            }
          })
        }
      }
    });

  }

  acceptOrder(id: string){
    this.enterpriseService.getById(this.enterprise._id.valueOf()).subscribe(data=>{
      let availablePostman = data['enterprise'].availablePostman;
      if(availablePostman > 0){
        this.enterpriseService.getAPostman(this.enterprise._id.valueOf()).subscribe((data)=>{});
        this.calcTimeForOrder();
      }
      else{
        this.orderService.updateStatus(id).subscribe((data)=>{})
      }
    })
  }

  calcTimeForOrder(){
    this.mapsService.getDistance('Majora Zorana Radosavljevica 365', 'Dalmatinske Zagore 103').subscribe(data=>{
      console.log(data);
    });
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
