import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garden-details',
  templateUrl: './garden-details.component.html',
  styleUrls: ['./garden-details.component.css']
})
export class GardenDetailsComponent implements OnInit {

  owner: string;
  gardenName: string;
  tmp: number;
  water: number;
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.owner = this.router.parseUrl(this.router.url).queryParams['owner'];
    this.gardenName = this.router.parseUrl(this.router.url).queryParams['gardenName'];
    this.tmp = this.router.parseUrl(this.router.url).queryParams['tmp'];
    this.water = this.router.parseUrl(this.router.url).queryParams['water'];


  }




}
