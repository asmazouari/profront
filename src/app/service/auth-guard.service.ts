import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenAuthService } from './token-auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: TokenAuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isSignedin()) {
      this.router.navigate(['login']);
      return false;
    }
    console.log(this.auth.getJwtToken());
    return true;
  }

}