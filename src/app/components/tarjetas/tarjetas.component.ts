import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent {

@Input() items: any[] = [];

  constructor(private router: Router) { }

  verArtista(item) {
    let artistaId;
    if (item.type === 'artist') {
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id;
    }
    console.log('ID', artistaId);
    this.router.navigate([ '/artista', artistaId ]);
  }
}
