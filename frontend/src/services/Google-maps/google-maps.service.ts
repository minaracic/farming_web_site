import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private http: HttpClient) { }

  getDistance(from:string, to:string){
    let req={
      a: from,
      b: to
    }
    return this.http.post(`${Constats.URI}/getDistance`, req);
  }
}
