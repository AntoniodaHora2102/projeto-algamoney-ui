//modulo de roteamento para o modulo de lancamento

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { LancamentoPesquisaComponent } from "./lancamento-pesquisa/lancamento-pesquisa.component";

//link as rotas para acessos as páginas as urls de cada component
const routes: Routes = [

    //objetos que representam os routes de cada de component
    { path: 'lancamentos', component: LancamentoPesquisaComponent },
    { path: 'lancamentos/novo', component: LancamentoCadastroComponent},
    { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent},
   
  ];

@NgModule({

    exports: [RouterModule],
  
    imports: [
        RouterModule.forChild(routes)
    ]
  })
  export class LancamentosRoutingModule { }
  