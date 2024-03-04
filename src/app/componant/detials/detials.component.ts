import { ProductService } from 'src/app/share/service/product.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/share/interfaces/product';
import { CartService } from 'src/app/share/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/service/wish-list.service';

@Component({
  selector: 'app-detials',
  templateUrl: './detials.component.html',
  styleUrls: ['./detials.component.css'],
})
export class DetialsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishListService: WishListService
  ) {}
  productDetails: product = {} as product;
  wishList: string[] = [];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parms) => {
        let idProduct: any = parms.get('id');
        this._ProductService.getProductDetails(idProduct).subscribe({
          next: (response) => {
            this.productDetails = response.data;
            console.log(response.data);
          },
        });
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
