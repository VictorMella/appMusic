import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  loading: boolean;
  artistas: any[] = [];
  access = false;
  constructor(private spotify: SpotifyService) {
    this.spotify.getToken().then(() => {
      this.access = true;
    });
  }

  onBuscar(termino: string) {
    if(this.access){
    this.loading = true;
    this.spotify.getArtistas(termino).subscribe((data: any) => {
      this.artistas = data;
      this.loading = false;
    });

    // tslint:disable-next-line: triple-equals
    if (termino.length == 0) {
      this.loading = false;
    }
  }
  }
}
