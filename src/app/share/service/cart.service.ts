import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  mytoken: any = { token: localStorage.getItem('etoken') };

  cartItem: BehaviorSubject<number> = new BehaviorSubject(0);


  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: this.mytoken,
      }
    );
  }

  getCartUser(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: this.mytoken,
    });
  }

  removeItem(id: string): Observable<any> {
    return this._HttpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart' + id,
      {
        headers: this.mytoken,
      }
    );
  }

  UpdateCount(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },
      { headers: this.mytoken }
    );
  }


  // PAYMENT

  paymentCash(shippingAddres: {}, id: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      {
        shippingAddress: shippingAddres,
      },
      { headers: this.mytoken }
    );
  }
  paymentOnline(shippingAddres: {}, id: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://github.com/Mohamed3Abozeid/ecommerce.git`,
      {
        shippingAddress: shippingAddres,
      },
      { headers: this.mytoken }
    );
  }



  // orders
  getOrder(userId: string):Observable<any> {
   return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
  }
  getAllOrder():Observable<any> {
   return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders`
    );
  }
}
