import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = 'https://ecommerce.routemisr.com';
  mytoken: any = { token: localStorage.getItem('etoken') };

  addToWish(id: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/wishlist`,
      {
        productId: id,
      },
      { headers: this.mytoken }
    );
  }

  removeFromWish(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${id}`, {
      headers: this.mytoken,
    });
  }

  showWish(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`, {
      headers: this.mytoken,
    });
  }
}
