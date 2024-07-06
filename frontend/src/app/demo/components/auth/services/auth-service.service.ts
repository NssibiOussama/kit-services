import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


import { RegisterRequest } from '../models/register-request.interface';
import { RegisterResponse } from '../models/register-response.interface';
import { LoginRequest } from '../models/login-request.interface';
import { LoginResponse } from '../models/login-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
 
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    if (this.isAuthenticated()) {
      this.loggedIn$.next(true);
    }
  }

  private readonly STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    ID: 'id',
    USERNAME: 'username',
    ROLES: 'roles'
  };

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('accessToken');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  register(signupRequestPayload: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(`${environment.apiUrl}/register`, signupRequestPayload);
  }

  login(loginRequestPayload: LoginRequest): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/login`, loginRequestPayload, { observe: 'response' }).pipe(
      map(response => {
        if (response.status === 200) {
          const token = response.body?.token;
          if (token) {
            sessionStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, token);
            this.loggedIn$.next(true);
          }
        }
        console.log(response.status); // Accessing the status code
        return response;
      })
    );
  }



  logout(): void {
    this.clearUserDataFromStorage()
    this.loggedIn$.next(false);
    this.router.navigate(['/']);
  }

  private clearUserDataFromStorage(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => sessionStorage.removeItem(key));
  }
}
