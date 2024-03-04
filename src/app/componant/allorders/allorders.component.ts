import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/interface/orders';
import { CartService } from 'src/app/share/service/cart.service';
import { ProductService } from 'src/app/share/service/product.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService) {}

  userId: any = localStorage.getItem('userId');
  len!: number;

  doneClick()
  {
    localStorage.removeItem('userId');
  }

  orders: order[] = [];

  ngOnInit(): void {
    this._CartService.getOrder(this.userId).subscribe({
      next: (res) => {
        // console.log("result",res);
        this.len = res.length;
        // console.log("lenght",this.len);
        
        this.orders = res;
        console.log("orders",this.orders);
        
        // console.log(this.orders[this.len - 1]);
      },
    });
  }
}
