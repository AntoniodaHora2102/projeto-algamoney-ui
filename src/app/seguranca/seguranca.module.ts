import { InputTextModule } from 'primeng/inputtext';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';

import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';


//funcao ira construir um oauthHttp que dara permissao aos tokens de acesso 
export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {

  //iremos passar o cabecario global da api
  const config = new AuthConfig({
      globalHeaders: [
        { 'Content-Type': 'application/json' }
      ]
    });
  
    // agora iremos instanciar o MoneyHttp ou inves do AuthHttp
    // MoneyHttp esta extends da Class pai AuthHpp
  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  providers: [ 
    {
      //servico http fornecido pelo angular2-jwt
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [AuthService, Http, RequestOptions] 
  },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
