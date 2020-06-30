import { Injectable } from '@angular/core';
import { Seed } from 'src/models/seed';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor(private http: HttpClient) { }

  deleteSeed(seed: Seed){
    let req = {
      id: seed._id
    }
    console.log(seed._id);
    return this.http.post(`${Constats.URI}/deleteSeedFromGarden`, req);
  }
}
