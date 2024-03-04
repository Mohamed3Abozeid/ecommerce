import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetService } from 'src/app/service/forget.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  constructor(private _ForgetService: ForgetService, private _Router: Router) {}

  userEmail!: string;
  userCode!: number;
  userNewPassword!: string;
  isLoading: boolean = false;
  massageEror: string = '';

  emailGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  codeGroup: FormGroup = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  newPasswordGorup: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    this.confromRepassword
  );

  confromRepassword(form: any) {
    if (form.get('password')?.value == form.get('rePassword')?.value) {
      return null;
    } else {
      return form
        .get('rePassword')
        ?.setErrors({ rePasswordMatch: 'RePassword Not Match Password' });
    }
  }

  handleEmail(email: string) {
    this.isLoading = true;
    this.massageEror = '';

    this._ForgetService.forgetPassword(email).subscribe({
      next: (response) => {
        console.log('email', response);
        this.userEmail = email;
        this.isLoading = false;
      },
      error: (err) => {
        this.massageEror = err.error.message;
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  handleCode(code: any) {
    this.isLoading = true;
    this.massageEror = '';
    this._ForgetService.resetCode(code).subscribe({
      next: (response) => {
        console.log('code', response);
        this.userCode = code;
        this.isLoading = false;
      },
      error: (err) => {
        this.massageEror = err.error.message;
        // console.log(err);
        this.isLoading = false;
      },
    });
  }

  handleForm(newPassword: string) {
    if (this.newPasswordGorup.valid) {
      this.isLoading = true;
      this.massageEror = '';

      this._ForgetService.newPassword(this.userEmail, newPassword).subscribe({
        next: (response) => {
          this._Router.navigate(['/login']);
          this.isLoading = false;
          // console.log(response);
        },
        error: (err) => {
          this.massageEror = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      console.log('proplem');
    }
  }
}
