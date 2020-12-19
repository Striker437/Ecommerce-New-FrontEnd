import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct } from '../Model/cart-product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  constructor(private httpClient:HttpClient) { }




  addToCart(productId,userId)
  {
    return this.httpClient.get<CartProduct[]>('http://localhost:8080/carts/addtocart/'+productId +'/'+userId)
  }




  CartDetails(userId: any) {
    return this.httpClient.get<CartProduct[]>('http://localhost:8080/carts/cart-details/'+userId)
  }
}
