import { ErrorHandlerService } from './../../core/error-handler.service';

import { PessoasFiltro, PessoasService } from './../pessoas.service';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pesquisa-pessoa',
  templateUrl: './pesquisa-pessoa.component.html',
  styleUrls: ['./pesquisa-pessoa.component.css']
})
export class PesquisaPessoaComponent {

  totalRegistros = 0;
  filtro = new PessoasFiltro();
  pessoas = [];

  //@ViewChild ira atualizar a tabela após exclusao do objeto e atualizar a pagina atual
  @ViewChild('tabela_pessoa', {static: true}) dadosTabelaPessoas;

  constructor(
    private pessoasService: PessoasService,
    private errorHandler: ErrorHandlerService,
    private toast: ToastyService,

    private  confirmation: ConfirmationService

    ) { }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoasService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    })

    //ira receber o erro caso tenha algum na pesquisa
    .catch(erro => this.errorHandler.handle(erro));
  }

   //metodo para carregar os dados toda vez que for acionado atraves do EVENT
   aoMudarPagina(event: LazyLoadEvent) {
    //verifica em qual pagina atual se encontra a pesquisa
    const pagina = event.first / event.rows;

    //metodo pesquisa ira receber o numero da pagina que foi calculado
    this.pesquisar(pagina);

  }

  //metodo ira confirmar ou nao exclusao da informacao
  confirmarExclusaoPessoa(pessoas: any) {

    this.confirmation.confirm({
      message: 'Deseja Excluir essa informação?',

      accept: () => {
        this.excluir(pessoas);
      }
    });
  }

  //metodo excluir pessoa
  excluir(pessoas: any) {

    this.pessoasService.excluir(pessoas.codigo)
    .then(() => {
     this.dadosTabelaPessoas.reset();

      //para ira ativar popup de confirmacao quando algum arquivo for excluído
      this.toast.success('Pessoa excluída com Sucesso!');
      })
    .catch(erro => this.errorHandler.handle(erro));
  }

  //mudar status de pessoa
  alternarStatus(pessoas: any): void {
    const novoStatus = !pessoas.ativo;

    this.pessoasService.mudarStatus(pessoas.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus? 'ativada' : 'desativada';

      pessoas.ativo = novoStatus;
      this.toast.success(`Pessoa ${acao} com sucesso!`);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
