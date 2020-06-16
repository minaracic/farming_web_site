import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${Constats.URI}/getAllUsers`);
  }
}
