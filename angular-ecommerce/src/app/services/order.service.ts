import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Model/order';
import { Purchase } from '../Model/purchase';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  constructor(private httpClient: HttpClient) { }



  purchase(purchase:Purchase) {
   return this.httpClient.post("http://localhost:8080/orders/",purchase);
  }


  
}
