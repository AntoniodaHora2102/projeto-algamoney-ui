//modulo de roteamento para o modulo de lancamento

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../seguranca/auth.guard";

import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { LancamentoPesquisaComponent } from "./lancamento-pesquisa/lancamento-pesquisa.component";

//link as rotas para acessos as páginas as urls de cada component
const routes: Routes = [

    //objetos que representam os routes de cada de component
    { 
      path: 
      'lancamentos', component: LancamentoPesquisaComponent, 
      canActivate: [AuthGuard],

      //objeto javascript que ira ter acesso array de ROLES da api
      data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']}
    },
    
    { 
      path: 
      'lancamentos/novo', component: LancamentoCadastroComponent,
      canActivate: [AuthGuard],

       //objeto javascript que ira ter acesso ao array de ROLES da api
       data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}
    },

    { 
      path: 
      'lancamentos/:codigo', component: LancamentoCadastroComponent,
      canActivate: [AuthGuard],

      //objeto javascript que ira ter acesso array de ROLES da api
      data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']}
    },
   
  ];

@NgModule({

    exports: [RouterModule],
  
    imports: [
        RouterModule.forChild(routes)
    ]
  })
  export class LancamentosRoutingModule { }
  