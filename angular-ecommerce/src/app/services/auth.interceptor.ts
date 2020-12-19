import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import {HttpInterceptor} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService:LoginService)
    {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq=req;
        let token=this.loginService.getToken();
        console.log('INTERCEPTOR',token);

        if(token!=null)
        {
            //let tokenstr='Bearer '+token;
             console.log('token is not null in interceptor')
            console.log('Bearer ',token)
            newReq = newReq.clone({
                headers: new HttpHeaders({
                  Authorization:`Bearer ${token}`
                })
              });
        }
        /* const req1 = req.clone({
            
            headers: req.headers.set('Authorization', `Bearer ${token}`)
            
          }); */
          
          return next.handle(newReq);


        //return next.handle(newReq)
    }

}