import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import {ValidatorFn, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService} from '../services/email.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
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
export class SendEmailComponent {

  
 email: string = '';

  emailForm: FormGroup
  isLoading: boolean = false
  subscription: Subscription = new Subscription()
  
  constructor(private emailService: EmailService,
    private messageService: MessageService,
    private route: Router,
    private titleService: Title,
    private fb: FormBuilder,
    public layoutService : LayoutService) {
    this.emailForm = this.fb.group({
      email: ["", [Validators.required, Validators.email, this.noWhitespaceValidator]],
      

    });
  }

 

  noWhitespaceValidator(control: AbstractControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  ngOnInit() {
  }


  sendEmail() {
  if (this.emailForm.valid) {
   this.isLoading = true

    this.subscription = this.emailService.sendResetEmail(this.emailForm.value.email).subscribe({
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
        console.log(error)
        this.isLoading = false
        this.messageService.add({
          severity:'error',
          detail: error.error.message,
          summary:'Error'
        })      }
    })
  }
  else {
    this.emailForm.markAllAsTouched()
  }
}

}

