import { Injectable } from '@angular/core';
import configData from '../../../assets/config.json';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import jwtDecode from 'jwt-decode';

let apiBase = configData.apiBase

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public isAuthorized() : boolean {
    const tokenStr = localStorage.getItem('token');
    if(tokenStr != null){
      const bearerToken : any = jwtDecode(tokenStr);
      const expirationSeconds = bearerToken.exp;
      const currentSeconds = new Date().getTime() / 1000;
      return expirationSeconds >= currentSeconds;
    }
    return false;
  }

  public isInRole(role : string) : boolean {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr != null){
      try{
        const bearerToken : any = jwtDecode(tokenStr);
        const tokenRole : string = bearerToken.Role;
        return role === tokenRole;
      }
      catch(err){
        return false;
      }
    }
    return false;
  }

  public isManager() : boolean{
    return this.isAuthorized()
      && (this.isInRole("SUPER ADMIN") || this.isInRole("POWER USER"))
  }

  public getUserId() : number {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr != null){
      try{
        const bearerToken : any = jwtDecode(tokenStr);
        return bearerToken.Id;
      }
      catch(err){
        return 0;
      }
    }
    return 0;
  }

  public login(password: string, email: string) : Observable<string>{
    const request =
      {
        email: email,
        password: password
      };
    const url = `${apiBase}/login`;
    return this.http.post(url, request, {responseType: 'text'})
      .pipe(
        tap(tokenResponse => {
          localStorage.setItem("token", tokenResponse)
        })
    );
  }

  public logout(): void{
    localStorage.removeItem("token")
  }
}
