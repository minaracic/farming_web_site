import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';

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

  getGarden(owner: string, gardenName: string){
    let req = {
      owner: owner,
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/getGarden`, req);
  }

  incWaterInGarden(owner:string, gardenName: string){
    let req = {
      owner:owner,
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/incWaterInGarden`, req);
  }

  decWaterInGarden(owner:string, gardenName: string){
    let req = {
      owner:owner,
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/decWaterInGarden`, req);
  }

  incTmpInGarden(owner:string, gardenName: string){
    let req = {
      owner:owner,
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/incTmpInGarden`, req);
  }

  decTmpInGarden(owner:string, gardenName: string){
    let req = {
      owner:owner,
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/decTmpInGarden`, req);
  }

  getAllMySeeds(owner:string, gardenName:string){
    let req = {
      owner: owner,
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
}
