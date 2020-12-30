import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Model/order';
import { OrderProduct } from '../Model/order-product';
import { Purchase } from '../Model/purchase';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  constructor(private httpClient: HttpClient) { }



  purchase(purchase:Purchase) {
   return this.httpClient.post("http://localhost:8080/api/orders",purchase);
  }


  OrderDetails()
  {
    return this.httpClient.get<OrderProduct[]>("http://localhost:8080/api/orders/getall")
  }


  
}
