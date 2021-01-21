import { PessoasService } from './../pessoas/pessoas.service';
import { LancamentoService } from './../lancamentos/lancamento.service';


import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { ToastyModule } from 'ng2-toasty';

import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from '../seguranca/auth.service';
import { JwtHelper } from 'angular2-jwt';

import { NavbarComponent } from './navbar/navbar.component';

import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';


registerLocaleData(localePt);

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],

  //serao adicionados alguns providers do app.module.ts
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoasService,

    AuthService,

    ConfirmationService,
    JwtHelper,
    Title,
    
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],

  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ]
})
export class CoreModule { }
