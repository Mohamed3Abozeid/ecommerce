import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/service/wish-list.service';
import { product } from 'src/app/share/interfaces/product';
import { CartService } from 'src/app/share/service/cart.service';
import { ProductService } from 'src/app/share/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishListService: WishListService
  ) {}
  AllProduct: product[] = [];
  searchTrem: string = '';
  wishList: string[] = [];
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.AllProduct = response.data;
      },
    });

    this._WishListService.showWish().subscribe({
      next: (response) => {
       this.wishList = response.data.map((item: any) =>item._id);
      },
    });
  }

  addProduct(id: string, btn: HTMLButtonElement) {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(btn, 'disabled');
                this._CartService.cartItem.next(response.numOfCartItems);

       
        
      },
    });
  }

  addToWish(id: string) {
    this._WishListService.addToWish(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.wishList = response.data;
        console.log(response);
      },
    });
  }

  removeFromWish(id: string) {
    this._WishListService.removeFromWish(id).subscribe({
      next: (response) => {
        this._ToastrService.error(response.message);
        this.wishList = response.data;
        console.log(response);
      },
    });
  }
}
