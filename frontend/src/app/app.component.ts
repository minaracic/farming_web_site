import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";
import { LogInService } from 'src/services/LogIn/log-in.service';
import { User } from 'src/models/user';
import { LogInRes, Constats } from 'src/constants';
import { Router } from '@angular/router';
import { GardenService } from 'src/services/Garden/garden.service';
import { SeedService } from 'src/services/Seed/seed.service';
import { Garden } from 'src/models/garden';
import { Farmer } from 'src/models/farmer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title="Farming";
  // username: string;

  constructor(public router: Router,
              public gardenService: GardenService,
              public seedService: SeedService){
    // this.username = JSON.parse(localStorage.getItem('user'))['username'];
  }

  updateGardens(){
    // console.log("updateGardens");
    this.gardenService.updateGardens().subscribe(data=>{

      this.gardenService.getAllGardens().subscribe(data2=>{
        let gardens = data2['gardens'];

        for(let i = 0; i < gardens.length; i++){
          let garden:Garden = gardens[i];

          if(garden.temperature < 12 || garden.water < 75){
            this.addNoteToMaintainGarden(garden.name.valueOf());
          }
          else{
            if(document.getElementById(garden.name.valueOf()))
              document.getElementById(garden.name.valueOf()).remove();
          }

        }
      })
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

  updateSeedsProgress(){
    console.log("updateSeedsProgress");
    this.seedService.updateProgress().subscribe(data=>{})
  }

  ngOnInit(){
    setInterval(()=>{this.updateGardens()}, Constats.gardenUpdateTime);
    setInterval(()=>{this.updateSeedsProgress()}, Constats.seedGrowTime);
  }

}
