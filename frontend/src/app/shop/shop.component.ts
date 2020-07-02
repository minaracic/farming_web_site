import { Component, OnInit } from '@angular/core';
import { Articl } from 'src/models/articl';
import { ArticlService } from 'src/services/articl/articl.service';
import { Order } from 'src/models/order';
import { Router } from '@angular/router';
import { OrderService } from 'src/services/order/order.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  articls: Articl[];
  order: Order;
  articlsToBuy: String[];
  gardenId: String;

  constructor(public router: Router, private articlsService: ArticlService, private orderService: OrderService) {

   }

  ngOnInit(): void {
    this.gardenId = this.router.parseUrl(this.router.url).queryParams['gardenId'];

    this.articlsService.getAllArticls().subscribe(data=>{
      this.articls = data['articls'];
    })
  }

  buy(){
    this.articlsToBuy = [];
    let toBuy = document.querySelectorAll("#checkBox:checked");
    if(toBuy.length == 0){
      window.alert("You need to have at least one articl in basket");
    }
    else{
      for(let i = 0; i < toBuy.length; i++){
        this.articlsToBuy.push(toBuy[i].getAttribute('value'));
      }
      this.order = {
        articlIds: this.articlsToBuy,
        gardenId: this.gardenId,
        dateOfOrder: new Date(),
        status: 1
      }

      console.log(this.order);
      this.orderService.createOrder(this.order).subscribe(data=>{
        let msg = data['msg'];
        if(msg == "Ok")window.alert("Your order is completed");
      })
    }
  }

}
