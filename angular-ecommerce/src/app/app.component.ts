import { Component, OnInit } from '@angular/core';
import { Jwtresponse } from './Model/jwtresponse';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  title = 'angular-ecommerce';

  jwtResponse:Jwtresponse
  name:any

  public loggedIn=false;
  userdetails: any;
  userId: any;
  constructor(private loginService:LoginService)
  {

  }
  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
    
    if(this.loggedIn)
    {

      console.log(this.loginService.getUserdetail());
      this.userdetails = JSON.parse(this.loginService.getUserdetail());      
    this.name=this.userdetails.name;
    this.userId=this.userdetails.id;
    console.log("getting user name in frontend",this.name)

    }
    

   // console.log("user name",this.user.name)


  }



  logoutUser()
  {
    this.loginService.logout();
    location.reload();
  }

   
  
  

  



  
}
