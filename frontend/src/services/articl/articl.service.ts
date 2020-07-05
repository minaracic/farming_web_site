import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';
import { Articl } from 'src/models/articl';
import { ArticlInStorage } from 'src/models/atriclInStorage';

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

  getArticlsFromEnterprise(enterpriseId: string){
    let req = {
      enterpriseId: enterpriseId
    };

    return this.http.post(`${Constats.URI}/getArticlsFromEnterprise`, req);
  }

  addNewArticl(articl: Articl){
    let req = {
      articl: articl
    };

    return this.http.post(`${Constats.URI}/addNewArticl`, req);
  }

  removeArticl(id: string){
    let req = {
      id: id
    };

    return this.http.post(`${Constats.URI}/removeArticl`, req);
  }

   getAllArticles(articlIds: ArticlInStorage[]){
    for(let i = 0; i < articlIds.length; i++){
      this.getById(articlIds[i].articlId).subscribe(data=>{
        articlIds[i].articl = data['articl'];
      });
    }
  }

}
