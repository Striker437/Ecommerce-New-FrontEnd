import { Component, OnInit } from '@angular/core';
import { OrderProduct } from 'src/app/Model/order-product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  orderProducts:OrderProduct[]=[]

  ngOnInit(): void {

    this.OrderDetails()
  }


  OrderDetails() {

    this.orderService.OrderDetails().subscribe(
     data=> {
       this.orderProducts=data
       console.log('Order Details',this.orderProducts)
       
      }
    )
   
  }

  
 
}
