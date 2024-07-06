import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = 'http://localhost:5000'; // Update the base URL with your Flask backend URL

  constructor(private http: HttpClient) { }

  sendResetEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send-reset-email`, { email });
  }

  resetPassword(code: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, { code, new_password: newPassword });
  }
}