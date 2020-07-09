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
      for(let i = 0; i < this.gardens.length; i++){
        let garden:Garden = this.gardens[i];

        if(garden.temperature < 12 || garden.water < 75){
          this.addNoteToMaintainGarden(garden.name.valueOf());
        }
        else{
          if(document.getElementById(garden.name.valueOf()))
            document.getElementById(garden.name.valueOf()).remove();
        }

      }
    });
  }

  addNoteToMaintainGarden(gardenName: string){
    let div = document.createElement("text");
    div.innerHTML = gardenName + " needs service";
    div.id = gardenName;
    div.style.border = "2px solid";
    div.style.margin = "2px"
    console.log(document.getElementById(gardenName))
    if(document.getElementById(gardenName) == null){
      document.getElementById("note").append(div);
    }
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

  addNewGarden(){
    this.router.navigate(['newGarden']);
  }

}
