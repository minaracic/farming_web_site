import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constats } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private http: HttpClient) { }

  getDistance(from:string, to:string){
    console.log(from, to);
    let h = {
     'Access-Control-Allow-Origin': '*',
     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
     "Authorization": "Bearer 6CLJWdqMw2OV6PFhieVUMjf17Y3YN_fEs8cJ-0SioRwMyeIaq5k2wjGoYrIi-wieycXlI0E3xSVnHZiOR97nuw"
    }
    //6CLJWdqMw2OV6PFhieVUMjf17Y3YN_fEs8cJ-0SioRwMyeIaq5k2wjGoYrIi-wieycXlI0E3xSVnHZiOR97nuw
    // const client = new Client({});

    // client
    // .elevation({
    //   params: {
    //     locations: [{ lat: 45, lng: -110 }],
    //     key: "AIzaSyDq1SIDuN-JWV0N_uIVv1gF_65oLMrpOXU",
    //   },
    //   timeout: 1000, // milliseconds
    // })
    // .then((r) => {
    //   console.log(r.data.results[0].elevation);
    // })
    // .catch((e) => {
    //   console.log(e.response.data.error_message);
    // });

   return this.http.get(`${Constats.mapsAPI}`, {headers: h});
  }
}
