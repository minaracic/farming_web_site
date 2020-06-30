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
      owner: 'farmer1'
    };
    return this.http.post(`${Constats.URI}/getGardensByOwner`, req);
  }

  incWaterInGarden(gardenName: string){
    console.log(gardenName);
    let req = {
      owner: 'farmer1',
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/incWaterInGarden`, req);
  }

  decWaterInGarden(gardenName: string){
    let req = {
      owner: 'farmer1',
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/decWaterInGarden`, req);
  }

  incTmpInGarden(gardenName: string){
    let req = {
      owner: 'farmer1',
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/incTmpInGarden`, req);
  }

  decTmpInGarden(gardenName: string){
    let req = {
      owner: 'farmer1',
      garden: gardenName
    };
    return this.http.post(`${Constats.URI}/decTmpInGarden`, req);
  }
}
