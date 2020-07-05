import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';
import { User } from 'src/models/user';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${Constats.URI}/getAllUsers`);
  }

  approveUser(username: string){
    let req = {
      username: username
    };

    return this.http.post(`${Constats.URI}/approveUser`, req);
  }

  deleteUser(username: string){
    let req = {
      username: username
    };

    return this.http.post(`${Constats.URI}/deleteUser`, req);
  }

  addNewUser(user){
    let req = {
      user: user
    };

    return this.http.post(`${Constats.URI}/addNewUser`, req);
  }

  changePassword(username: string, oldPass: string, newPass: string){
    let req = {
      username: username,
      oldPass: oldPass,
      newPass: newPass
    };
    return this.http.post(`${Constats.URI}/changePassword`, req);
  }

  checkPassword(username: string, oldPass: string){
    let req = {
      username: username,
      pass: oldPass,
    };
    return this.http.post(`${Constats.URI}/checkPassword`, req);
  }

}
