import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartProduct } from '../Model/cart-product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  
  
  TotalPrice: Subject<number>=new Subject<number>();   //event for subscribe
  TotalQuantity:Subject<number>=new Subject<number>();   //event for subscribe ,subject is subclass of observable , it is used to pass the data  between different components i,e from child to child

  constructor(private httpClient:HttpClient) { }




  addToCart(productId,userId)
  {
    return this.httpClient.get<CartProduct[]>('http://localhost:8080/carts/addtocart/'+productId +'/'+userId)
  }




  CartDetails(userId: any) {
    return this.httpClient.get<CartProduct[]>('http://localhost:8080/carts/cart-details/'+userId)
  }






  removeProduct(productId: string) {
    return this.httpClient.delete<CartProduct[]>('http://localhost:8080/carts/'+productId);
  }



  CalculateTotal(cartProducts: CartProduct[]) {

    let TotalPriceValue:number=0;
    let TotalQuantityValue:number=0;

    for (let i = 0; i < cartProducts.length; i++) {
      TotalPriceValue = TotalPriceValue + cartProducts[i].price
      TotalQuantityValue = TotalQuantityValue + cartProducts[i].quantity
    }
    
    console.log("Total Price", TotalPriceValue)
    console.log("Total Quantity",TotalQuantityValue )

    this.TotalPrice.next(TotalPriceValue)
    this.TotalQuantity.next(TotalQuantityValue)
  }

  
}
