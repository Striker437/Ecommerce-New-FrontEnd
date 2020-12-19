import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jwtresponse } from '../Model/jwtresponse';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  

  constructor(private httpClient:HttpClient) { }


   //calling the server to generate the token

  generateToken(credentials)
  {
    //token generate
    return this.httpClient.post<Jwtresponse>('http://localhost:8080/token',credentials);
  }



 


  //for login user

  loginUser(token)
  {

    localStorage.setItem("token",token);

    return true;

  }

  setUserdetail(userDetails:User){
    localStorage.setItem("user",JSON.stringify(userDetails));
  }


  getUserdetail(){
    return localStorage.getItem("user");
  }


  //to check that user is logged in
  isLoggedIn()
  {
    let token=localStorage.getItem("token");
    if(token==undefined || token==null || token=='')
    return false;

    else
    return true;
  }


  //for logout the user
  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }


  //get the token
   getToken()
   {
     return localStorage.getItem('token')
   }

//   public getToken() {
//     const currentUser = JSON.parse(localStorage.getItem('token') || '{}');
//     console.log("GET TOKEN VALUE ", currentUser.ticket);          ///done for debugging
//     return currentUser.ticket;
// }
}
