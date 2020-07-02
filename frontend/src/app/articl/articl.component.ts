import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlService } from 'src/services/articl/articl.service';
import { Articl } from 'src/models/articl';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-articl',
  templateUrl: './articl.component.html',
  styleUrls: ['./articl.component.css']
})
export class ArticlComponent implements OnInit {

  articls: Articl[];

  constructor(public router: Router, public articlService: ArticlService) { }

  ngOnInit(): void {
    let id = JSON.parse(localStorage.getItem('user'))['_id'];
    console.log(id);
    this.articlService.getArticlsFromEnterprise(id).subscribe(data=>{
      this.articls = data['articls'];
    })
  }

  addNewArticl(){
    this.router.navigate(['/newArticl']);
  }

}
