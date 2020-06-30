import { Component, OnInit } from '@angular/core';
import { GardenService } from 'src/services/Garden/garden.service';
import { Router } from '@angular/router';
import { ArticlInStorage } from 'src/models/atriclInStorage';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  gardenId: string;
  articles: ArticlInStorage[];

  constructor(public router: Router, private gardenService: GardenService) { }

  ngOnInit(): void {
    this.gardenId = this.router.parseUrl(this.router.url).queryParams['gardenId'];
    console.log(this.gardenId);
    this.getStorage();
  }

  getStorage(){
    this.gardenService.getMyStorage(this.gardenId).subscribe(data=>{
      console.log(data);
      this.articles = data['articles'];
    })
  }

}
