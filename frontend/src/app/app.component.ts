import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";
import { LogInService } from 'src/services/LogIn/log-in.service';
import { User } from 'src/models/user';
import { LogInRes, Constats } from 'src/constants';
import { Router } from '@angular/router';
import { GardenService } from 'src/services/Garden/garden.service';
import { SeedService } from 'src/services/Seed/seed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title="Farming"
  constructor(public router: Router,
              public gardenService: GardenService,
              public seedService: SeedService){

  }

  updateGardens(){
    console.log("updateGardens");
    this.gardenService.updateGardens().subscribe(data=>{})
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
