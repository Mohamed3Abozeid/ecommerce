import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componant/login/login.component';
import { ReigisterComponent } from './componant/reigister/reigister.component';
import { HomeComponent } from './componant/home/home.component';
import { BrandsComponent } from './componant/brands/brands.component';
import { CatagreComponent } from './componant/catagre/catagre.component';
import { ProductsComponent } from './componant/products/products.component';
import { NotFoundComponent } from './componant/not-found/not-found.component';
import { FooterComponent } from './componant/footer/footer.component';
import { DetialsComponent } from './componant/detials/detials.component';
import { NavBlankComponent } from './componant/nav-blank/nav-blank.component';
import { NavAuthComponent } from './componant/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './componant/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './componant/blank-layout/blank-layout.component';
import { CartComponent } from './componant/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { WishComponent } from './componant/wish/wish.component';
import { SearchPipe } from './pipe/search.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { ForgetPasswordComponent } from './componant/forget-password/forget-password.component';
import { PaymentComponent } from './componant/payment/payment.component';
import { AllordersComponent } from './componant/allorders/allorders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReigisterComponent,
    HomeComponent,
    BrandsComponent,
    CatagreComponent,
    ProductsComponent,
    NotFoundComponent,
    FooterComponent,
    DetialsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    CartComponent,
    WishComponent,
    SearchPipe,
    ForgetPasswordComponent,
    PaymentComponent,
    AllordersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
