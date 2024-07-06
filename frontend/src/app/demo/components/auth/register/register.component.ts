import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import {ValidatorFn, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { RegisterRequest } from '../models/register-request.interface';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
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
export class RegisterComponent {
  
  valCheck: string[] = ['remember'];

  password!: string;

  showPassword: boolean = false
  signupForm: FormGroup
  isLoading: boolean = false
  subscription: Subscription = new Subscription()
  registerRequest: RegisterRequest = {
    username: "",
    password: "",
    email: ""
    
  }
  constructor(private authService: AuthService,
    private messageService: MessageService,
    private route: Router,
    private titleService: Title,
    private fb: FormBuilder,
    public layoutService : LayoutService) {
    this.signupForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(24), this.noWhitespaceValidator]],
      email: ["", [Validators.required, Validators.email, this.noWhitespaceValidator]],
      password: ["", [Validators.required, Validators.minLength(8), this.noWhitespaceValidator,passwordValidator()]],
      cpassword: ["", [Validators.required, this.confirmPasswordValidator()]]

    });
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.root.get('password');
      const confirmPassword = control.value;
      return password && confirmPassword && password.value !== confirmPassword ? { 'mismatch': true } : null;
    };
  }

  noWhitespaceValidator(control: AbstractControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  ngOnInit() {
  }

//   signup() {
//     if (!this.isLoading && this.signupForm.valid) {
//       let registerRequest: RegisterRequest = {
//         username: this.signupForm.value.username,
//         password: this.signupForm.value.password,
//         email: this.signupForm.value.email
//       }

//       this.isLoading = true
//       this.subscription = this.authService.register(registerRequest).pipe(take(1)).subscribe({
//         next: (response) => {
//           const severity = response.statusCode === 200 ? 'success' : 'error'
//           const detail = response.statusCode === 200 ? response.message : response.exception
//           const summary = response.statusCode === 200 ? 'Success' : 'Error'
//           this.messageService.add({
//             severity: severity,
//             detail: detail,
//             summary: summary
//           })
//           this.isLoading = false
//           if (response.statusCode === 200) {
//             this.route.navigateByUrl("/login")
//           }
//         },
        
//       })
//     }   
//   }
// }
signup() {
  if (this.signupForm.valid) {
    this.registerRequest.email = this.signupForm.value.email;
    this.registerRequest.username = this.signupForm.value.username;
    this.registerRequest.password = this.signupForm.value.password;

    this.isLoading = true
    console.log(this.registerRequest)

    this.subscription = this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        this.isLoading = false
        this.messageService.add({
          severity:'success',
          detail: response.message,
          summary:'Success'
        })
        this.route.navigateByUrl("")

       
      },
      error: (error) => {
        this.isLoading = false
        this.messageService.add({
          severity:'error',
          detail: error.error.message,
          summary:'Error'
        })      }
    })
  }
  else {
    this.signupForm.markAllAsTouched()
  }
}

}
