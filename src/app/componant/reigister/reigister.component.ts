import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/share/service/auth.service';

@Component({
  selector: 'app-reigister',
  templateUrl: './reigister.component.html',
  styleUrls: ['./reigister.component.css'],
})
export class ReigisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  erro: string = '';
  isLoadind: boolean = false;

  reigisterForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confromRepassword
  );

  handleForm() {
    if (this.reigisterForm.valid) {
      this.isLoadind = true;
      this._AuthService.setReigister(this.reigisterForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoadind = false;

            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoadind = false;
          this.erro = err.error.message;
        },
      });
    }
  }

  confromRepassword(form: any) {
    if (form.get('password')?.value == form.get('rePassword')?.value) {
      return null;
    } else {
      return form
        .get('rePassword')
        ?.setErrors({ rePasswordMatch: 'RePassword Not Match Password' });
    }
  }
}
