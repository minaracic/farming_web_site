import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';
import { Garden } from 'src/models/garden';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(private http: HttpClient){ }

  getGardensByOwner(owner: string){
    let req = {
      owner: owner
    };
    return this.http.post(`${Constats.URI}/getGardensByOwner`, req);
  }

  updateGardens(){
    return this.http.get(`${Constats.URI}/updateGardens`);
  }

  getGarden(gardenName: string){
    let req = {
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/getGarden`, req);
  }

  getAllGardens(){
    return this.http.get(`${Constats.URI}/getAllGardens`);
  }

  incWaterInGarden(gardenName: string){
    let req = {
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/incWaterInGarden`, req);
  }

  decWaterInGarden(gardenName: string){
    let req = {
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/decWaterInGarden`, req);
  }

  incTmpInGarden(gardenName: string){
    let req = {
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/incTmpInGarden`, req);
  }

  decTmpInGarden(gardenName: string){
    let req = {
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/decTmpInGarden`, req);
  }

  getAllMySeeds(gardenName:string){
    let req = {
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/getAllGardensSeeds`, req);
  }

  getMyArticles(gardenId: String){
    let req = {
      gardenId: gardenId
    };

    return this.http.post(`${Constats.URI}/getStorageArticles`, req);
  }

  addNew(garden: Garden){
    let req = {
      garden: garden
    };

    return this.http.post(`${Constats.URI}/addNewGarden`, req);

  }
}
