import { Injectable } from '@angular/core';
import { Constats, LogInRes } from '../../constants';
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }

  logIn(username: string, password: string){
    let req = {
      username: username,
      password: password
    }

    return this.http.post(`${Constats.URI}/logIn`, req);
  }

  getUser(user:User){
    let req = {
      username: user.username,
      type: user.type
    }
    return this.http.post(`${Constats.URI}/getUser`, req);

  }

}
