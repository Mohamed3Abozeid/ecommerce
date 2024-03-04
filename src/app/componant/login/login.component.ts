import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/share/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _Router:Router, private _AuthService: AuthService) { }
    erro: string = '';
  isLoadind: boolean = false;
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)])
  })

  handleLogin()
    {
    if (this.loginForm.valid)
    {
      this.isLoadind = true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => { 
          if (response.message == 'success')
          {
            localStorage.setItem('etoken',response.token)
            this.isLoadind = false;
            this._Router.navigate(['/home'])
  }


        },
        error: (err) => {
          this.isLoadind = false;
          this.erro = err.error.message;
        }

      })

    }
    else
    {
      this.loginForm.markAllAsTouched();
     }
    }

}
