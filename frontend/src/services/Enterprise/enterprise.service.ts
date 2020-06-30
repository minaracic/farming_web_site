import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';
import { User } from 'src/models/user';
import { Enterprise } from 'src/models/enterprise';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private http: HttpClient) { }

  addNewEnterprise(user){
    let req = {
      user: user
    };

    return this.http.post(`${Constats.URI}/addNewEnterprise`, req);
  }

  getByUsername(username: String){
    let req = {
      username: username,
      type: 1
    };

    return this.http.post(`${Constats.URI}/getUser`, req);
  }

  updateEnterprise(username: String, toUpdate: Enterprise){
    let req = {
      username: username,
      enterprise: toUpdate
    };

    return this.http.post(`${Constats.URI}/updateEnterprise`, req);
  }
}
