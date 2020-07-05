import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';
import { User } from 'src/models/user';
import { Farmer } from 'src/models/farmer';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private http: HttpClient) { }

  addNewFarmer(user){
    let req = {
      user: user
    };

    return this.http.post(`${Constats.URI}/addNewFarmer`, req);
  }

  updateFarmer(username: String, toUpdate: Farmer){
    let req = {
      username: username,
      farmer: toUpdate
    };

    return this.http.post(`${Constats.URI}/updateFarmer`, req);
  }

  getByUsername(username: String){
    let req = {
      username: username,
      type: 2
    };

    return this.http.post(`${Constats.URI}/getUser`, req);
  }



}
