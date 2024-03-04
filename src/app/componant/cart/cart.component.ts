import { product } from 'src/app/share/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import { CartService } from 'src/app/share/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  cartProduct: any = [];
  numberOfItem: number = 0;
  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next: (response) => {
        localStorage.setItem('userId', response.data.cartOwner);
        this.cartProduct = response.data;

        this.numberOfItem = response.numOfCartItems;
      },
    });
  }

  deletItem(id: string) {
    this._CartService.removeItem(id).subscribe({
      next: (resonse) => {
        this.cartProduct = resonse.data;
        if (resonse.status == 'success') {
          this._CartService.cartItem.next(resonse.numOfCartItems);

          this.numberOfItem = resonse.numOfCartItems;
        } else if (resonse.message == 'success') {
          this.numberOfItem = resonse.numOfCartItems;
          this._CartService.cartItem.next(0);
        }
      },
    });
  }

  upDateCount(id: string, newCount: number) {
    this._CartService.UpdateCount(id, newCount).subscribe({
      next: (response) => {
        if (newCount == 0) {
          this.deletItem(`/${id}`);
        } else {
          this.cartProduct = response.data;
          this.numberOfItem = response.numOfCartItems;
        }
      },
    });
  }
}
