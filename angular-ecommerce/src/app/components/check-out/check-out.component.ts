import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/Model/order';
import { OrderProduct } from 'src/app/Model/order-product';
import { Purchase } from 'src/app/Model/purchase';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  
  userId: any;
  userdetails: any;
  cartProducts: any
  OrderTrackingId: any;

  constructor(private cartService:CartService,
             private loginService:LoginService,
             private orderService:OrderService) { }

  TotalPrice:number=0;
  TotalQuantity:number=0;

  ngOnInit(): void {
    this.userdetails = JSON.parse(this.loginService.getUserdetail());      
    this.userId=this.userdetails.id;

    
    this.CartDetails(this.userId)
    
    this.updateCartStatus();
  }



  CartDetails(userId)
  {
    this.cartService.CartDetails(userId).subscribe(
      data => {
        this.cartProducts = data;
        console.log("getting the cart products", this.cartProducts)
        this.cartService.CalculateTotal(this.cartProducts)
      }
    )

  }




  updateCartStatus() {
    this.cartService.TotalPrice.subscribe(
      data=>
     {
         this.TotalPrice=data
         console.log('TotalPrice',this.TotalPrice)
    })
 
 
 
    this.cartService.TotalQuantity.subscribe(
     data=>
    {
        this.TotalQuantity=data
        console.log('TotalQuantity',this.TotalQuantity)
   })
 
 }





 placeOrder()
 {
   let order=new Order()    //set up order
   order.TotalQuantity=this.TotalQuantity    //set order quantity as total price and quantity
   order.Totalprice=this.TotalPrice
   let orderProducts:OrderProduct[]=[]           
   for(let i=0;i<this.cartProducts.length;i++)
    {
     orderProducts[i]=new OrderProduct(this.cartProducts[i])   //create order products from cart products
    }


    //set up purchase
    let purchase=new Purchase()    


    //populate purchase order and orderproducts
    purchase.order=order  
    purchase.orderProducts=orderProducts


   console.log("cartProducts",this.cartProducts)
   console.log("Total Quantity",this.TotalQuantity)
   console.log("Total Quantity",this.TotalPrice)
   console.log("Purchase",purchase)


   //call rest api via orderService
   this.orderService.purchase(purchase).subscribe(
     {
      next:response=>
      {
         alert('your order has been recieved');
         console.log(response);
      },
      error:err=>
      {
        alert('there was an error');
      }
     }
   )

   
 }

}
