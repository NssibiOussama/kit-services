import { SendEmailComponent } from './send-email.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SendEmailRoutingModule } from './send-email-routing.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';








@NgModule({
    imports: [
        CommonModule,
        SendEmailRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule, 
        FormsModule,
        ReactiveFormsModule,
        PasswordModule,
        MessagesModule,
        ToastModule
        
    ],
    declarations: [SendEmailComponent]
})
export class SendEmailModule {}
