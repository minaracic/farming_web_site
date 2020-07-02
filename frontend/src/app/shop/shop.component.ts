import { Component, OnInit } from '@angular/core';
import { Articl } from 'src/models/articl';
import { ArticlService } from 'src/services/articl/articl.service';
import { Order } from 'src/models/order';
import { Router } from '@angular/router';
import { OrderService } from 'src/services/order/order.service';
import { ɵELEMENT_PROBE_PROVIDERS__POST_R3__ } from '@angular/platform-browser';

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
  ordersOfEnterprise: Map<String, Array<String>> = new Map();

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
      this.createOrders(this.articlsToBuy);
    }
    this.ordersOfEnterprise = new Map();
  }

  getArticlById(articlId: string){
    for(let i = 0; i<this.articls.length; i++){
      if(this.articls[i]._id == articlId)return this.articls[i];
    }
    return null;
  }

  createOrders(basket:String[]){
    for(let i = 0; i < basket.length; i++){
      let articl = this.getArticlById(basket[i].valueOf());
      let vals = this.ordersOfEnterprise.get(articl.enterpriseId.valueOf());
      if(vals == null){
        vals = new Array<String>();
      }
      vals.push(articl._id);
      this.ordersOfEnterprise.set(articl.enterpriseId.valueOf(), vals);
    }

    this.ordersOfEnterprise.forEach((v, k) => {
      let order: Order = {
        _id: null,
        articlIds: v,
        enterpriseId: k,
        gardenId: this.gardenId,
        dateOfOrder: new Date(),
        status: 1
      }

      this.orderService.createOrder(order).subscribe(data=>{
        let msg = data['msg'];
        if(msg == "Ok")window.alert("Your order is completed");
      })
    });
    }

}
