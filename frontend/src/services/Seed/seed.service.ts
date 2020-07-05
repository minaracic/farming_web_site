import { Injectable } from '@angular/core';
import { Seed } from 'src/models/seed';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';
import { ArticlInStorage } from 'src/models/atriclInStorage';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(private http: HttpClient) { }

  getById(seedId: string){
    let req = {
      id: seedId
    }
    return this.http.post(`${Constats.URI}/getSeedById`, req);
  }

  deleteSeed(seed: Seed){
    let req = {
      id: seed._id
    }
    return this.http.post(`${Constats.URI}/deleteSeedFromGarden`, req);
  }

  plantASeed(articl: ArticlInStorage){

    let req = {
      gardenId: articl.gardenId,
      harvested: false,
      name: articl.articl.name,
      producerId: articl.articl.enterpriseId,
      totalGrowDays: articl.articl.totalGrowDays
    }

    let s = {
      seed: req
    }
    return this.http.post(`${Constats.URI}/plantASeed`, s);
  }

  updateProgress(){
    return this.http.get(`${Constats.URI}/updateProgress`);
  }

  setHarvested(seedId: string){
    let s = {
      seed: seedId
    }
    return this.http.post(`${Constats.URI}/setHarvested`, s);
  }
}
