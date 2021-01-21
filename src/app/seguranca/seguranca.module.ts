import { InputTextModule } from 'primeng/inputtext';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';


//funcao ira construir um oauthHttp que dara permissao aos tokens de acesso 
export function authHttpServiceFactory(http: Http, options: RequestOptions) {

  //iremos passar o cabecario global da api
  const config = new AuthConfig({
      globalHeaders: [
        { 'Content-Type': 'application/json' }
      ]
    });
  
  return new AuthHttp( config, http, options);
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
    deps: [Http, RequestOptions] 
  }
  ]
})
export class SegurancaModule { }
