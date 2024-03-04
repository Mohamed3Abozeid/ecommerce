import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgetService {
  constructor(private _HttpClient: HttpClient) {}

  mytoken: any = { token: localStorage.getItem('etoken') };

  forgetPassword(userEmail: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        email: userEmail,
      }
    );
  }






  resetCode(code: number): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        resetCode: code,
      }
    );
  }





  newPassword(email:string,newPassword:string): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        email: email,
        newPassword: newPassword,
      }
    );
  }
}
