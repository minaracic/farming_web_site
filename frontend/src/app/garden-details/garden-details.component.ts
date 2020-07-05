import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Garden } from 'src/models/garden';
import { Seed } from 'src/models/seed';
import { GardenService } from 'src/services/Garden/garden.service';
import { SeedService } from 'src/services/Seed/seed.service';
import { Constats } from 'src/constants';
import { ArticlInStorage } from 'src/models/atriclInStorage';
import { OrderService } from 'src/services/order/order.service';
import { Articl } from 'src/models/articl';
import { ArticlService } from 'src/services/articl/articl.service';
import { EnterpriseService } from 'src/services/Enterprise/enterprise.service';
import { StorageComponent } from '../storage/storage/storage.component';
import { emit } from 'process';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-garden-details',
  templateUrl: './garden-details.component.html',
  styleUrls: ['./garden-details.component.css']
})
export class GardenDetailsComponent implements OnInit {

  owner: string;
  gardenName: string;
  gardenId: string;
  water:number;
  tmp: number;
  numOfSeeds: number;
  seeds: Seed[][];
  allSeeds: Seed[];
  numOfCols:number;
  numOfRows:number;
  garden: Garden;

  public eventEmitter = new EventEmitter();
  articlesObj1: ArticlInStorage[];
  articlesObj2: ArticlInStorage[];
  orderes: Articl[];

  seedDetailsNode: Node;

  constructor(public router: Router,
    protected gardenService: GardenService,
    protected seedService: SeedService,
    protected orderService: OrderService,
    protected articlService: ArticlService,
    protected enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
    this.articlesObj1 = [];
    this.articlesObj2 = [];

    this.owner = this.router.parseUrl(this.router.url).queryParams['owner'];
    this.gardenName = this.router.parseUrl(this.router.url).queryParams['gardenName'];

    this.gardenService.getGarden(this.owner, this.gardenName).subscribe(data=>{
      this.garden = data['garden'];
      this.water = this.garden.water.valueOf();
      this.tmp = this.garden.temperature.valueOf();
      this.numOfSeeds = this.garden.totalSeeds.valueOf();
      this.gardenId = this.garden._id.valueOf();

      this.gardenService.getAllMySeeds(this.owner, this.gardenName).subscribe(data=>{
        this.allSeeds = data['seeds'];
        this.createSeedsTable();
        this.putSeedsInTable();
      })
    });

  }

  createSeedsTable(){
    if(this.numOfSeeds <= 10){
      this.numOfCols = this.numOfSeeds;
      this.numOfRows = 1;
      this.seeds = new Array<Array<Seed>>(this.numOfRows);
      for(let i = 0; i < this.numOfRows; i ++){
        this.seeds[i] = new Array<Seed>(this.numOfSeeds);
      }
    }
    else{
      this.numOfCols = 10;
      this.numOfRows = Math.floor(this.numOfSeeds / 10);
      if(this.numOfSeeds % 10 != 0)this.numOfRows++;
      this.seeds = new Array<Array<Seed>>(this.numOfRows);
      let rest = 0;
      for(let i = 0; i < this.numOfRows-1; i ++){
        this.seeds[i] = new Array<Seed>(10);
        rest += 10;
      }
      this.seeds[this.numOfRows - 1] = new Array<Seed>(this.numOfSeeds - rest);
    }
  }

  putSeedsInTable(){
    for(let i = 0; i < this.numOfRows; i++){
      for(let j = 0 ; j < 10; j++){
        this.seeds[i][j] = this.allSeeds[i*10 + j];
      }
    }
  }

  addElixir(seed: Seed){

  }

  seedDetails(seed: Seed, event: MouseEvent){
    window.open("http://localhost:4200/seedProgress?user="+ JSON.stringify(seed));
  }

  confirmToHarvest(seed: Seed){
    if(confirm("Are you sure you want to harvest this seed?")){
      seed.harvested = true;
      setTimeout(()=>{
        this.harvestSeed(seed);
      }, Constats.harvestTime);
    }
  }

  harvestSeed(seed){
    this.seedService.deleteSeed(seed).subscribe(data=>{
      this.gardenService.getAllMySeeds(this.owner, this.gardenName).subscribe(data=>{
        this.allSeeds = data['seeds'];
        this.createSeedsTable();
        this.putSeedsInTable();
      })
    });
  }

  public getMyStorage(){
    this.router.navigate(['/storage'], {queryParams: {gardenId: this.gardenId}});

  }

}
