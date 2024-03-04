import { product } from './../share/interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productes:product[],search:string): product[] {
    return productes.filter((product)=>product.title.toLowerCase().includes(search))
  }

}
