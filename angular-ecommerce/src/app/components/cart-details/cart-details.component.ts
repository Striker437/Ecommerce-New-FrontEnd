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


  constructor(private loginService: LoginService, private dialog : MatDialog,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {

   

     this.userdetails = JSON.parse(this.loginService.getUserdetail());      
     this.userId=this.userdetails.id;


     this.route.params.forEach((urlParams) => {
       this.productId = urlParams['product_id'];
     this.userId = urlParams['user_id'];

     this.cartDetails=this.route.snapshot.paramMap.has('userId')


     if(this.cartDetails)
     {
     const user_Id=this.route.snapshot.paramMap.get('userId')
     this.CartDetails(user_Id)
     }

      else
      this.addToCart(this.productId, this.userId);


      this.updateCartStatus();

    });


  }
  
 

   openPopUp() {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',
     });
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


  // CalculateTotal(cartProducts: CartProduct[]) {

  //   for (let i = 0; i < cartProducts.length; i++) {
  //     this.TotalPrice = this.TotalPrice + cartProducts[i].price
  //     this.TotalQuantity = this.TotalQuantity + cartProducts[i].quantity
  //   }
  //   //this.cartService.setTotalQuantity(this.TotalQuantity)
  //   //this.cartService.setTotalPrice(this.TotalPrice)
  //   console.log("total price", this.TotalPrice)
  //   console.log("total quantity",this.TotalQuantity )
  // }





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
