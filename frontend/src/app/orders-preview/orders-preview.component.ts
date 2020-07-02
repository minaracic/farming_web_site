import { Component, OnInit } from '@angular/core';
import { Order } from 'src/models/order';
import { OrderService } from 'src/services/order/order.service';
import { Router } from '@angular/router';
import { Articl } from 'src/models/articl';
import { Enterprise } from 'src/models/enterprise';

@Component({
  selector: 'app-orders-preview',
  templateUrl: './orders-preview.component.html',
  styleUrls: ['./orders-preview.component.css']
})
export class OrdersPreviewComponent implements OnInit {

  orders: Order[];
  articls: Articl[];
  enterprise: Enterprise;

  constructor(public router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.enterprise = JSON.parse(localStorage.getItem('user'));
    console.log(this.enterprise);
   this.orderService.getOrdersFromEnterprise(this.enterprise._id.valueOf()).subscribe(data=>{
     console.log(data['orders']);
   })
  }

}
