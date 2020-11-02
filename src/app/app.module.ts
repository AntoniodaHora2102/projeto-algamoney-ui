import { SegurancaModule } from './seguranca/seguranca.module';
import { PesquisaPessoaComponent } from './pessoas/pesquisa-pessoa/pesquisa-pessoa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LancamentoPesquisaComponent } from './lancamentos/lancamento-pesquisa/lancamento-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent},
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent},
  { path: 'pessoas', component: PessoaCadastroComponent},
  { path: 'pessoas/nova', component: PesquisaPessoaComponent}
];



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot( routes ),
    HttpModule,
    HttpClientModule,

    LancamentosModule,
    PessoasModule,
    CoreModule,
    SegurancaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
