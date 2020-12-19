import { tokenName } from '@angular/compiler';
import { EventEmitter,Component, OnInit, Output } from '@angular/core';
//import { EventEmitter } from 'events';
import { Jwtresponse } from 'src/app/Model/jwtresponse';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @Output()
  notify:EventEmitter<String>=new EventEmitter<String>()
  
  name:any

  credentials={
    username:'',
    password:''
  }
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }


  

  onSubmit()
  {
    console.log('form is submitted');
    if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!='' && this.credentials.password!=''))
    {
      console.log('we have to submit the form to server');
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>
        {
          //if token is successfuly generated
          console.log("response for token",response)
          console.log("successfully generated the token :",response.token);
          console.log("token and username is ",response.user.name)
          this.loginService.setUserdetail(response.user);
          this.name=response.user.name
          this.loginService.loginUser(response.token);
          window.location.href="/product";
        },
        error=>
        {
          //else error 
           console.log("error comes in generating the token :",error);
        }
        


      )
    }
    else{
      console.log('fields are empty');
    }
  }



 

}
