import { ProductService } from 'src/app/share/service/product.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/share/interfaces/g.categories';

@Component({
  selector: 'app-catagre',
  templateUrl: './catagre.component.html',
  styleUrls: ['./catagre.component.css'],
})
export class CatagreComponent implements OnInit {
  constructor(private _ProductService: ProductService) { }
  alLCategories:categories[]=[]
  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next: (response) =>
      {
        this.alLCategories=response.data
        }
    })
  }
}
