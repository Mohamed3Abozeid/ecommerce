import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/share/service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  id: any = '';

  
  ngOnInit(): void {


    
    this._ActivatedRoute.paramMap.subscribe({
      next: (parms) => {
        this.id = parms.get('id');
        console.log(this.id);
      },
    });
  }

  form: FormGroup = new FormGroup({
    details: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  cashPay() {
    this._CartService.paymentCash(this.form.value, this.id).subscribe({
      next: (response) => {

        this.userOrder(response.user)
        
        
        
      },
    });
  }
  onloinePay() {
    this._CartService.paymentOnline(this.form.value, this.id).subscribe({
      next: (response) => {
        console.log(response.session);
        
        window.open(response.session.url, '_self');
      },
    });
  }


  userOrder(id: string)
  {
    this._CartService.getOrder(id).subscribe({
      next: (response) => {
        console.log(response);
        
      }
    })
  }
}
