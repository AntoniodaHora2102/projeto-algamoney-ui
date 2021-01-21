import { SegurancaModule } from './seguranca/seguranca.module';

import { PesquisaPessoaComponent } from './pessoas/pesquisa-pessoa/pesquisa-pessoa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';

import { CoreModule } from './core/core.module';

import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';



import { HttpModule, URLSearchParams } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing,module';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    HttpModule,
    HttpClientModule,

    LancamentosModule,
    PessoasModule,
    CoreModule,
    SegurancaModule,

    //as rotas foram transferidas para este modulo
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
