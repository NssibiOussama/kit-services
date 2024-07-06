import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { AuthService} from './demo/components/auth/services/auth-service.service'
import { AuthGuard } from './demo/components/auth/guards/auth.guard';
import { ToastModule } from 'primeng/toast';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';


export function tokenGetter() {
    return sessionStorage.getItem("accessToken");
  }



@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        BrowserAnimationsModule,
        BrowserModule,

        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              allowedDomains: [environment.domainUrl],
              authScheme: "Bearer "
            }
          }),
    
    ],
    providers: [ AuthService, AuthGuard,MessageService ,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        ProductService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
