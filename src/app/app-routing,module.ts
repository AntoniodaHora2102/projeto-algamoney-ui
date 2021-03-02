import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { NaoAutorizadoComponent } from "./core/nao-autorizado.component";

import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";


//link as rotas para acessos as páginas as urls de cada component
const routes: Routes = [

    //irá direcionar o localhost:4200 para iniciar para da Pagina de Lancamentos  
    { path: '', redirectTo:'login', pathMatch:'full' },

    // ira direcionar para pagina "nao autorizado" caso o usuario nao tem permissao
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },
 
    //ira redireciona qualquer coisa que esteja fora da rotas para a pagina-nao-encontrada
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},

    { path: '**' , redirectTo:'pagina-nao-encontrada'}
  ];
  
  @NgModule({
    
    imports: [
      //forRoot e importado apenas quando utiliza-se no app.module.ts
      RouterModule.forRoot( routes ),
    ],

    //exporta as rotas para demais acoes das telas
    exports: [RouterModule]
    })
  export class AppRoutingModule { }