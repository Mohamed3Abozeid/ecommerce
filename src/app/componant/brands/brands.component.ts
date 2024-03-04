import { Component } from '@angular/core';
import { Brand } from 'src/app/share/interfaces/product';
import { ProductService } from 'src/app/share/service/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent {
  constructor(private _ProductService: ProductService) {}
  AllBrands: Brand[] = [];

  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next: (response) => {
        this.AllBrands = response.data;
      },
    });
  }
}
