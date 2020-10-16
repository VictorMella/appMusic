import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fotoAlternativa'
})
export class FotoAlternativaPipe implements PipeTransform {
  transform(imagen: any[]): string {
    if (!imagen) {
      return 'assets/img/noimage.png';
    }

    if (imagen.length > 0) {
      return imagen[0].url;
    } else {
      return 'assets/img/noimage.png';
    }
  }
}
