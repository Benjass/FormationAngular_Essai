import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private service: LoginService) {}

  canActivate() {
    return this.service.isConnected$.pipe(
      first(),
      tap((v) => !v && this.router.navigateByUrl(''))
    );
  }

  canActivateChild() {
    return this.canActivate();
  }
}
