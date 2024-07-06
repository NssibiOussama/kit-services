import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ValidatorFn,AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { LoginRequest } from '../models/login-request.interface';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';


export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/; // At least 8 characters, one uppercase, one lowercase, one number

    if (!regex.test(value)) {
      return { 'invalidPassword': true };
    }

    return null;
  };
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers : [MessageService]

})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    showPassword: boolean = false
    loginForm: FormGroup;
    isLoading: boolean = false;
    subscription: Subscription = new Subscription()
  
    loginRequest: LoginRequest = {
      email: "",
      password: ""
    }

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private titleService: Title,
    private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ["" ,Validators.required],
            password: ["",Validators.required],

          });
        }
      
        ngOnInit(): void {
          this.titleService.setTitle("Sign in - KitSuccuess")
        }
      
        noWhitespaceValidator(control: AbstractControl) {
          const isSpace = (control.value || '').match(/\s/g);
          return isSpace ? { 'whitespace': true } : null;
        }
      
      //   login() {
      //     if (!this.isLoading && this.loginForm.valid) {
      //       let loginRequest: LoginRequest = {
      //         username: this.loginForm.value.username,
      //         password: this.loginForm.value.password
      //       }
      
      //       this.isLoading = true;
      //       this.subscription = this.authService.login(loginRequest).pipe(take(1)).subscribe({
      //         next: (response) => {
      //           const severity = response.statusCode === 200 ? 'success' : 'error'
      //           const detail = response.statusCode === 200 ? 'Connected successfully' : response.exception === 'Bad credentials' ? 'Please verify your information' : response.exception;
      //           const summary = response.statusCode === 200 ? 'Success' : 'Error';
      //           this.messageService.add({
      //             severity: severity,
      //             detail: detail,
      //             summary: summary
      //           });
      //           this.isLoading = false;
      //           if (this.authService.isUserLoggedIn() && this.authService.isAuthenticated()) {
      //             this.router.navigateByUrl('/main');
      //           }
      //         },
      //         error: () => {
      //           this.isLoading = false;
      //           this.messageService.add({
      //             severity: 'error',
      //             detail: 'An error occurred. Please try again later.',
      //             summary: 'Error'
      //           });
      //         }
      //       });
      //     }
      //     else {
      //       this.loginForm.markAllAsTouched()
      //     }
      //   }
      // }
      login() {
        if (this.loginForm.valid) {
          this.loginRequest.email = this.loginForm.value.email;
          this.loginRequest.password = this.loginForm.value.password;
          this.isLoading = true;
          this.authService.login(this.loginRequest).subscribe({
            next: (response) => {
              this.isLoading = false;
              this.messageService.add({
                severity:  'success',
                detail:'Connected successfully',
                summary:'Success'
              });
              if (this.authService.isUserLoggedIn() && this.authService.isAuthenticated()) {
                             this.router.navigateByUrl('/admin');
                           }

         
            },
            error: (error) => {
              this.isLoading = false;
              this.messageService.add({
                severity:  'error',
                detail:error.error.message,
                summary:'Error'
              });            }
          });
        }
        else {
          this.loginForm.markAllAsTouched()
        }
      }
     }

