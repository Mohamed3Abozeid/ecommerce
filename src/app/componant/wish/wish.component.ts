import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/service/wish-list.service';
import { CartService } from 'src/app/share/service/cart.service';
import { ProductService } from 'src/app/share/service/product.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css'],
})
export class WishComponent implements OnInit {
  constructor(
    private _WishListService: WishListService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  myList: any[] = [];
  listCount: number = 0;

  ngOnInit(): void {
    this.showList();
  }

  addProductToList(id: string) {
    this._WishListService.addToWish(id).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
  removeProductFromList(id: string) {
    this._WishListService.removeFromWish(id).subscribe({
      next: (response) => {
        this.showList();
        this._ToastrService.error(response.message);
      },
    });
  }

  showList() {
    this._WishListService.showWish().subscribe({
      next: (response) => {
        this.myList = response.data;
        this.listCount = response.count;
      },
    });
  }

  addToCart(id: string, btn: HTMLButtonElement) {

    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
    });
  }
}
