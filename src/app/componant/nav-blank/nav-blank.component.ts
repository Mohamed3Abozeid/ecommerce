import { AuthService } from 'src/app/share/service/auth.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/share/service/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}

  navCountItem: number = 0;

  ngOnInit(): void {
    this._CartService.cartItem.subscribe({
      next: (data) => {
        this.navCountItem = data;
      },
    });

    this._CartService.getCartUser().subscribe({
      next: (rsponse) => {
        console.log(rsponse);

        this._CartService.cartItem.next(rsponse.numOfCartItems);
      },
    });
  }

  numCount: number = 0;

  logout(): void {
    this._AuthService.logOutUser();
  }
}
