import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthorized() : boolean {
    return true;
  }

  public isInRole(role : string) : boolean {
    return true;
  }

  public getUserId() : number{
    return 0;
  }
}
