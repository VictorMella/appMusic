import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  nuevasCanciones: any[] = [];
  contador: number;
  loading = true;
  hola: any;

  error: boolean;
  mensajeError: string;
  constructor(private spotify: SpotifyService) {
    this.spotify.getToken()
    .then(resp => {
      console.log()
      this.getRealese();
      this.getContador();
    }); 
  }

  getRealese(){
    this.spotify.getNewReleases().subscribe(
      (resp: any) => {
        this.nuevasCanciones = resp;
        this.loading = false;
      },
      errorServicio => {
        this.loading = false;
        this.error = true;
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
      }
    );
  }


  getContador() {
    this.spotify.getContador().subscribe((resp: any) => {
      // console.log(resp),
      this.contador = resp.albums.total;
      // console.log(this.contador);
    });
    return this.contador;
  }

  getVerMas() {
    this.spotify.getMasRealease().subscribe((resp: any) => {
      this.nuevasCanciones = resp;
      console.log(this.nuevasCanciones);
      this.loading = false;
      this.hola = this.getContador();
      console.log('HOLA', this.hola);
    });
  }

  getVerMenos() {
    this.spotify.getMenosRealease().subscribe((resp: any) => {
      this.nuevasCanciones = resp;
      console.log(this.nuevasCanciones);
      this.loading = false;
      this.getContador();
      this.hola = this.getContador();
      console.log('CHAO', this.hola);
    });
  }
}
