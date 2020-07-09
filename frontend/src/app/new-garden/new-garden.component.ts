import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor, NgForm } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { Garden } from 'src/models/garden';
import { GardenService } from 'src/services/Garden/garden.service';

@Component({
  selector: 'app-new-garden',
  templateUrl: './new-garden.component.html',
  styleUrls: ['./new-garden.component.css']
})
export class NewGardenComponent implements OnInit {

  name: string;
  place: string;
  width: number;
  height: number;
  owner: string;

  constructor(private gardenService: GardenService) { }

  ngOnInit(): void {
    this.owner = JSON.parse(localStorage.getItem('user'))['username'];
    console.log(this.owner);
  }

  newGarden(from: NgForm){
    let totalSeeds = Math.floor(this.width*this.height);

    let garden: Garden = {
      _id: null,
      height:this.height,
      width:this.width,
      place:this.place,
      name:this.name,
      owner: this.owner,
      numOfUsedSeeds: 0,
      temperature: 18,
      water: 200,
      totalSeeds: totalSeeds
    }

    this.gardenService.addNew(garden).subscribe(data=>{
      window.alert("New garden successfully added");
    })
  }
}
