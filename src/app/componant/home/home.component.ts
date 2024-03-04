import { product } from './../../share/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/share/service/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { categories } from 'src/app/share/interfaces/g.categories';
import { CartService } from 'src/app/share/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/service/wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishListService: WishListService
  ) {}
  products: product[] = [];
  categories: categories[] = [];
  wishList: string[] = [];

  ngOnInit(): void {
    this._ProductService.getProductsNext().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });

    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });

    this._WishListService.showWish().subscribe({
      next: (response) => {
        this.wishList = response.data.map((item: any) => item._id);
      },
    });
  }

  addProduct(id: string, btn: HTMLButtonElement) {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this._CartService.cartItem.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
      error: (noAnswer) => {
        console.log(noAnswer);

        this._ToastrService.error(noAnswer.message);
        this._Renderer2.removeAttribute(btn, 'disabled');
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

  sliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 700,
    autoplayTimeout: 2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  categoryOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 700,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
