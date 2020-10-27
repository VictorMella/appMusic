import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent {
  artista = {};
  track: any [] = [];
  loading: boolean;
  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loading = true,
    this.router.params.subscribe(params => {
     this.getArtista( params['id']);
     this.getTrack( params['id']);

    });
  }
  getArtista(id: string) {
    this.loading = true,
    this.spotify.getArtista(id).subscribe((resp: any) => {
      this.artista = resp;
      this.loading = false;
      console.log(this.artista);
    });
  }

  getTrack(id: string) {
    this.spotify.getTrackArtista(id).subscribe((resp: any) => {
    this.track = resp;
    console.log(this.track);
    });
  }
}
