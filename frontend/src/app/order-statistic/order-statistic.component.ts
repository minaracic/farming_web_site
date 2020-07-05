import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/services/order/order.service';
import { Router } from '@angular/router';
import { Order } from 'src/models/order';
import { Statistic } from 'src/constants';

@Component({
  selector: 'app-order-statistic',
  templateUrl: './order-statistic.component.html',
  styleUrls: ['./order-statistic.component.css']
})
export class OrderStatisticComponent implements OnInit {

  statistic: Statistic[];
  totalOrders: number;

  constructor(public router: Router, private orderService: OrderService) {
    this.statistic = [];
  }

  ngOnInit() {
    for(let from = 0; from < 30; from++){
      this.orderService.getOrdersFrom(from).subscribe(data=>{
        let total = data['orders'].length;
        let dateOfOrder: String = data['date'];
        dateOfOrder = dateOfOrder.split('T')[0];
        let s: Statistic = {
          date: dateOfOrder,
          total: total
        }
        this.statistic.push(s);
      })
    }
    this.sortByDate();
  }

  sortByDate(){
    this.statistic = this.statistic.sort();
    console.log(this.statistic);
  }


}
