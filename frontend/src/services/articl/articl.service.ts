import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class ArticlService {

  constructor(private http: HttpClient) { }

  getAllArticls(){
    return this.http.get(`${Constats.URI}/getAllArticls`);
  }

  getById(articlId: String){
    let req = {
      articlId: articlId
    };

    return this.http.post(`${Constats.URI}/getArticlById`, req);
  }

}
