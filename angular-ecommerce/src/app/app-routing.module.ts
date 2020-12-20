import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListbyCategoryComponent } from './components/product-listby-category/product-listby-category.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'search/:keyword' , component:ProductListbyCategoryComponent},
 {path: 'category/:id' , component:ProductListComponent,canActivate:[AuthGuard]},
 {path: 'category' , component:ProductListComponent,canActivate:[AuthGuard]},
 {path: 'product/:id' , component:ProductDetailsComponent},
 {path: 'product' , component:ProductListbyCategoryComponent,canActivate:[AuthGuard]},
 {path:'login',component:LoginComponent},
 {path:'product/addtocart/:product_id/:user_id',component:CartDetailsComponent,canActivate:[AuthGuard]},
 {path: 'category/:id/addtocart/:product_id/:user_id', component:CartDetailsComponent,canActivate:[AuthGuard]},
  {path: 'cart-details/:userId', component:CartDetailsComponent,canActivate:[AuthGuard]},
 {path:'' , component:HomeComponent},
//  {path: '' , redirectTo:'/product' ,pathMatch:'full'},
//  {path: '**' , redirectTo:'/product',pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
