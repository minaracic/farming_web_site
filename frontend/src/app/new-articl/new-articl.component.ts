import { Component, OnInit } from '@angular/core';
import { Articl } from 'src/models/articl';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlComponent } from '../articl/articl.component';
import { ArticlService } from 'src/services/articl/articl.service';

@Component({
  selector: 'app-new-articl',
  templateUrl: './new-articl.component.html',
  styleUrls: ['./new-articl.component.css']
})
export class NewArticlComponent implements OnInit {

  name: string;
  type: string;
  qnt: number;
  price: number;
  articl: Articl;

  constructor(public router: Router, private articlService: ArticlService) { }

  ngOnInit(): void {
  }

  newArticl(newArticlForm: NgForm){
    let id = JSON.parse(localStorage.getItem('user'))['_id'];

    this.articl = {
      _id: null,
      type: 2,
      name: this.name,
      qnt: this.qnt,
      price: this.price,
      enterpriseId: id,
      score: 0
    }

    this.articlService.addNewArticl(this.articl).subscribe(data=>{
      let msg = data['msg'];
      if(msg == 'Ok'){
        window.alert("New articl added");
      }
      else{
        window.alert("New articl not added");
      }
    })
  }

}
