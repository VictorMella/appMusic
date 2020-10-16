import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {



  constructor(private http: HttpClient) { }

  getQuery(query: string) {
  const url = `https://api.spotify.com/v1/${ query }`;
  const headers = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    Authorization: 'Bearer BQAGxciAVzy02zv8iB6Hz2pyYgDLfz7-8-N7PfWHfs3ekJ_YuhgcmNMiQUlYfko_bCcsfaQPtqw8SPC3bZc'
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





