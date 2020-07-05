import { Component, OnInit } from '@angular/core';
import { Garden } from 'src/models/garden';
import { GardenService } from 'src/services/Garden/garden.service';
import { Router } from '@angular/router';
import { Constats } from 'src/constants';

@Component({
  selector: 'app-gardens-overview',
  templateUrl: './gardens-overview.component.html',
  styleUrls: ['./gardens-overview.component.css']
})
export class GardensOverviewComponent implements OnInit {

  gardens: Garden[];
  owner: string;
  constructor(public router: Router, private gardenService: GardenService) { }

  ngOnInit(): void {
    this.owner = JSON.parse(localStorage.getItem('user'))['username'];
    console.log(this.owner);

    this.gardenService.getGardensByOwner(this.owner).subscribe(data=>{
      this.gardens = data['gardens'];
      console.log(this.gardens);
    });


  }

  incWaterInGarden(gardenName: string){
    this.gardenService.incWaterInGarden(gardenName).subscribe(data=>{

    })
  }

  decWaterInGarden(gardenName: string){
    this.gardenService.decWaterInGarden(gardenName).subscribe(data=>{

    })
  }

  incTmpInGarden(gardenName: string){
    this.gardenService.incTmpInGarden(gardenName).subscribe(data=>{

    })
  }

  decTmpInGarden(gardenName: string){
    this.gardenService.decTmpInGarden(gardenName).subscribe(data=>{

    })
  }

  getGardenDetails(gardenName: string){
    this.router.navigate(["/gardenDetails"], {queryParams: {gardenName: gardenName}});
  }

}
