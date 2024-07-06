import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
      return false;
    }

    if (this.sessionExpired()) {
      alert("Session expired, please log in again.");
      this.authService.logout();
      return false;
    }

    return true;
  }

  private sessionExpired(): boolean {
    return !!sessionStorage.getItem("accessToken") && !this.authService.isAuthenticated();
  }
}
