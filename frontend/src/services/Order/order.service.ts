import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/models/order';
import { Constats } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order){
    let req = {
      order: order
    }

    return this.http.post(`${Constats.URI}/createOrder`, req);
  }

  getOrdersFromGarden(gardenId: String){
    let req = {
      gardenId: gardenId
    };
    return this.http.post(`${Constats.URI}/getOrdersFromGarden`, req);
  }

  cancelOrder(orderId: string){
    let req = {
      orderId: orderId
    };
    return this.http.post(`${Constats.URI}/cancelOrder`, req);
  }

  getAllOrders(){
    return this.http.get(`${Constats.URI}/allOrders`);
  }

  getOrdersFromEnterprise(enterpriseId: string){
    let req = {
      enterpriseId: enterpriseId
    };
    return this.http.post(`${Constats.URI}/getOrdersFromEnterprise`, req);
  }

  updateStatus(orderId: string, status: number){
    let req = {
      orderId: orderId,
      status: status
    };
    return this.http.post(`${Constats.URI}/updateOrderStatus`, req);
  }

  getOrdersFrom(fromToday: number){
    let req = {
      fromToday: fromToday
    };

    return this.http.post(`${Constats.URI}/orderFromDay`, req);
  }
}
