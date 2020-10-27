import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
token = null


  constructor(private http: HttpClient) { }

  async getToken() {
    const body = new HttpParams()
    .append('grant_type', 'client_credentials')
    .append('client_id', '23ee7949d3c34e789ce9cfc5fef71167')
    .append('client_secret', 'ad2b1e230a964abc99b7ac7e7e1cd7cf');

    const obj = this.http.post('https://accounts.spotify.com/api/token', body)
        .toPromise().then( (token: any) => {
          this.token = `Bearer ${token['access_token']}`;
        }, (err: any)=> {
          console.log(err);
    });

    return obj;
  }

  getQuery(query: string) {
  const url = `https://api.spotify.com/v1/${ query }`;
  const headers = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    Authorization: `${this.token}`
    });

  return this.http.get( url, { headers });
  }

  getNewReleases() {
  return this.getQuery('browse/new-releases')
        .pipe(map(resp =>  resp['albums'].items));

  }

  getContador() {
    return this.getQuery('browse/new-releases');
          // .pipe(map(resp =>  resp['albums'].items));
    }

  getMasRealease() {
    return this.getQuery('browse/new-releases?offset=20&limit=20')
          .pipe(map(resp =>  resp['albums'].items));
  }

  getMenosRealease() {
    return this.getQuery('browse/new-releases?offset=0&limit=20')
          .pipe(map(resp =>  resp['albums'].items));
    }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist`)
        .pipe(map(resp => resp['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${ id }`);
    // .pipe(map(resp =>  resp['albums'].items));
  }

  getTrackArtista(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
        .pipe(map(resp =>  resp['tracks']));
  }
}





