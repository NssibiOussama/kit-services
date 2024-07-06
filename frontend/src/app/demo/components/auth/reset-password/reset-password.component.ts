import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import {ValidatorFn, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { EmailService } from '../services/email.service';
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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
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
export class ResetPasswordComponent {
  code : any
  showPassword: boolean = false
  resetForm: FormGroup
  isLoading: boolean = false
  subscription: Subscription = new Subscription()
  
  constructor(private emailService: EmailService,
    private messageService: MessageService,
    private route: Router,
    private titleService: Title,
    private fb: FormBuilder,
    public layoutService : LayoutService,
    private ac : ActivatedRoute) {
    this.resetForm = this.fb.group({
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

    this.code = this.ac.snapshot.params['code']

  }


  reset() {
  if (this.resetForm.valid) {
    this.isLoading = true
    this.subscription = this.emailService.resetPassword(this.code,this.resetForm.value.password).subscribe({
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
    this.resetForm.markAllAsTouched()
  }
}

}

