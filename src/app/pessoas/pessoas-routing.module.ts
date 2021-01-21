import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PesquisaPessoaComponent } from "./pesquisa-pessoa/pesquisa-pessoa.component";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";



//link as rotas para acessos as páginas as urls de cada component
const routes: Routes = [

    //objetos que representam os routes de cada de component
    { path: 'pessoas', component: PesquisaPessoaComponent},
    { path: 'pessoas/nova', component: PessoaCadastroComponent},
    { path: 'pessoas/:codigo', component: PessoaCadastroComponent},

  ];
  
  
@NgModule({

    exports: [RouterModule],
  
    imports: [
        RouterModule.forChild(routes)
    ]
  })
  export class PessoasRoutingModule { }
  