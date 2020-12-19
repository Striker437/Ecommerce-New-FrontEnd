import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-listby-category',
  templateUrl: './product-listby-category.component.html',
  styleUrls: ['./product-listby-category.component.css']
})
export class ProductListbyCategoryComponent implements OnInit {


  userdetails:any
  loggedIn:boolean
  searchMode:boolean;
  products:Product[];
  userId: any;
  constructor(private ProductService:ProductService,
              private route:ActivatedRoute,
              private loginService:LoginService) { }

 
  ngOnInit(): void {



    this.loggedIn=this.loginService.isLoggedIn();
    
    if(this.loggedIn)
    {

      console.log(this.loginService.getUserdetail());
      this.userdetails = JSON.parse(this.loginService.getUserdetail());      
    this.userId=this.userdetails.id;
    console.log("getting user id in frontend",this.userId)

    }

    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    this.route.paramMap.subscribe(() =>
    {
      if(this.searchMode)
    this.searchProducts();

    else{
      this.listProducts();
    }
    });
    
  
    
   }
  

   listProducts() {

    
  
     this.ProductService.getProductList().subscribe(              
      data =>
      {
        this.products=data;   
      }

     )
    
   }


   searchProducts() {
    const theKeyword:String=this.route.snapshot.paramMap.get('keyword');


    this.ProductService.searchProducts(theKeyword).subscribe(

    data=>
     {
    this.products=data;
    }

    )
  }


 


}
