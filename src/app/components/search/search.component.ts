import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
 loading: boolean;
artistas: any[] = [];
  constructor(private spotify: SpotifyService) { }
  onBuscar(termino: string) {
    this.loading = true;
    this.spotify.getArtistas( termino )
        .subscribe((data: any) => {
            this.artistas = data;
            this.loading = false;
        });

    // tslint:disable-next-line: triple-equals
    if (termino.length == 0) {
      this.loading = false;
    }
  }
}
