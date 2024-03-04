import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './componant/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './componant/auth-layout/auth-layout.component';
import { NotFoundComponent } from './componant/not-found/not-found.component';
import { LoginComponent } from './componant/login/login.component';
import { ReigisterComponent } from './componant/reigister/reigister.component';
import { HomeComponent } from './componant/home/home.component';
import { CatagreComponent } from './componant/catagre/catagre.component';
import { BrandsComponent } from './componant/brands/brands.component';
import { ProductsComponent } from './componant/products/products.component';
import { CartComponent } from './componant/cart/cart.component';
import { authGuard } from './share/gards/auth.guard';
import { DetialsComponent } from './componant/detials/detials.component';
import { WishComponent } from './componant/wish/wish.component';
import { ForgetPasswordComponent } from './componant/forget-password/forget-password.component';
import { PaymentComponent } from './componant/payment/payment.component';
import { AllordersComponent } from './componant/allorders/allorders.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'details/:id', component: DetialsComponent, title: 'Detsils' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'categories', component: CatagreComponent, title: 'Categories' },
      { path: 'brand', component: BrandsComponent, title: 'Brands' },
      { path: 'products', component: ProductsComponent, title: 'Products ' },
      { path: 'cart', component: CartComponent, title: 'Cart List' },
      { path: 'wishList', component: WishComponent, title: 'Wish List' },
      { path: 'payment/:id', component: PaymentComponent, title: 'Payment' },
      { path: 'allorders', component: AllordersComponent, title: 'Your Order' },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'reigister', component: ReigisterComponent, title: 'Reigister' },
      {
        path: 'forgetPassword',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
      },
    ],
  },

  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
