import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Garden } from 'src/models/garden';
import { Seed } from 'src/models/seed';
import { GardenService } from 'src/services/Garden/garden.service';
import { SeedService } from 'src/services/Seed/seed.service';

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

  seedDetailsNode: Node;

  constructor(public router: Router, private gardenService: GardenService, private seedService: SeedService) { }

  ngOnInit(): void {
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

  createSeedDetailsPopUp(w, seed: Seed, event: MouseEvent){
    let div = document.createElement("div");
    div.id = "seedDetails";
    div.style.fontSize = "15px";
    div.style.border = ".5px solid black";
    div.style.width = "350px";
    div.style.height = "100px"
    div.style.backgroundColor = "white";
    div.setAttribute("z-index", 100 + "");

    let name = document.createElement("div");
    name.style.margin = "5px";
    name.innerHTML = "Name: " + seed.name;
    name.setAttribute("z-index", 100 + "");
    div.append(name);

    let producer = document.createElement("div");
    producer.innerHTML = "Producer: " + seed.producer;
    producer.style.margin = "5px";
    div.append(producer);

    let valueNow = Number((seed.progress.valueOf() / seed.totalGrowDays.valueOf() * 100).toFixed(2));
    let progress = document.createElement("div");
    progress.className = "progress";
    progress.style.margin = "5px";
    let progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-valuenow", valueNow + "");
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");
    progressBar.style.width = valueNow + "%";
    progressBar.innerHTML = valueNow + "%";
    progress.append(progressBar);
    div.append(progress);

    let btn = document.createElement("button");
    btn.style.margin = "5px";
    btn.className = "btn btn-large btn-warning";
    btn.innerHTML = "Add elixir";
    // btn.onclick = this.addElixir(seed, event);
    div.append(btn);
    w.document.documentElement.append(div);

    this.seedDetailsNode = div;
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
      }, 3000);
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

  getMyStorage(){
    this.router.navigate(['/storage'], {queryParams: {gardenId: this.gardenId}});
  }
}
