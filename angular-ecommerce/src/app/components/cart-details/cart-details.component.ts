import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { CartProduct } from 'src/app/Model/cart-product';
import { Product } from 'src/app/Model/product';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  TotalPrice: number = 0;
  TotalQuantity: number = 0;
  userId: any;
  productId: any;
  cartProducts: CartProduct[] = [];
  cartDetails:boolean;
  deleteProduct: boolean;
  userdetails: any;
  //loginId: any;


  constructor(private loginService: LoginService, private dialog : MatDialog,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {

   

     this.userdetails = JSON.parse(this.loginService.getUserdetail());     //get the usserid from local storage   
     this.userId=this.userdetails.id;



     this.productId=this.route.snapshot.paramMap.get('product_id')
    

     this.cartDetails=this.route.snapshot.paramMap.has('userId')


     if(this.cartDetails)
     {
     const user_Id=this.route.snapshot.paramMap.get('userId')
     this.CartDetails(user_Id)
     }

      else
      this.addToCart(this.productId, this.userId);


      this.updateCartStatus();

      console.log("Total price",this.TotalPrice)

    


  }
  
 


  addToCart(productId: any, userId: any) {

    this.cartService.addToCart(this.productId, this.userId).subscribe(
      data => {
        this.cartProducts = data;
        console.log("getting the cart products", this.cartProducts)
        this.cartService.CalculateTotal(this.cartProducts)
      }
    )
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




  remove(productId: string) {

    console.log("getting cart produtct id" , productId )
    
    this.cartService.removeProduct(productId).subscribe(
      data => {
        this.cartProducts = data;
        console.log("getting the cart products after removing one product", this.cartProducts)
        this.cartService.CalculateTotal(this.cartProducts)
      }
    )
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

}





incrementQuantity(tempcartProduct)
{
 this.cartService.incrementQuantity(tempcartProduct.id,this.userId).subscribe(
   
  data=>{

    this.cartProducts = data;
    this.cartService.CalculateTotal(this.cartProducts)

 })

}


decrementQuantity(tempcartProduct)
{

  this.cartService.decrementQuantity(tempcartProduct.id,this.userId).subscribe(
    data=>
    {
      this.cartProducts = data;
      this.cartService.CalculateTotal(this.cartProducts)

  })


}



}
