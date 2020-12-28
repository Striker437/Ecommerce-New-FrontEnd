import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  
  userdetails: any;
  userId: any;
  
  constructor(private loginService:LoginService,
              private cartService:CartService,) { }

 
  TotalPrice:number=0
  TotalQuantity:number=0

  ngOnInit(): void {
    this.userdetails = JSON.parse(this.loginService.getUserdetail());      
    this.userId=this.userdetails.id;

    this.updateCartStatus();
    
    
  }




  updateCartStatus() {
    this.cartService.TotalPrice.subscribe(
      data=>
     {
         this.TotalPrice=data
    })
 
 
 
    this.cartService.TotalQuantity.subscribe(
     data=>
    {
        this.TotalQuantity=data
   })

   console.log('Total Quantity' , this.TotalQuantity )
   console.log('Total Price' , this.TotalPrice )
 
 }

  

  

}
