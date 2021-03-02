import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  //vamos instanciar a variavel filtro para que o mesmo utilize
  //as informacoes diretamente do compoment lancamento.service.ts
  filtro = new LancamentoFiltro();

  //varial para gerar a paginacao diretamente da tabela de dados da Api
  totalRegistros = 0;

  //variavel de pesquisa
  //descricao: string;

  //variavel de pesquisa por data
   //dataVencimentoInicio: Date;
  //dataVencimentoFim: Date;

  lancamentos = [ ];

  //@ViewChild ira atualizar a tabela após exclusao do objeto e atualizar a pagina atual
  @ViewChild('tabela', {static: true}) dadosTabela;

  constructor(
    private lancamentoService: LancamentoService,
    public auth: AuthService,
    private toast: ToastyService,
    private erroHandler: ErrorHandlerService,

    //servico que altera o titulo da aba do sistema
    private title: Title,

    //servico de dialogo para solicitar a confirmacao do usuario se deseja realmente excluir
    private confirmation: ConfirmationService
    ) { }

  ngOnInit() {
    
    //insere o novo titulo na aba
    this.title.setTitle('Pesquisa de Lançamentos');
  
    // this.pesquisar(); - nao sera necessario chamar o metodo pesuisa no ngOnInit pois o metodo aoMudarPagina ira realizar essa pesquisa
  }

  //metodo que realiza a pesquisa do objetos
  pesquisar(pagina = 0) {
   /* const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };*/

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    })
    //ira receber o erro caso tenha algum na pesquisa
      .catch(erro => this.erroHandler.handle(erro));
  }

    //metodo para carregar os dados toda vez que for acionado atraves do EVENT
    aoMudarPagina(event: LazyLoadEvent) {
    //verifica em qual pagina atual se encontra a pesquisa
    const pagina = event.first / event.rows;

    //metodo pesquisa ira receber o numero da pagina que foi calculado
    this.pesquisar(pagina);

  }

  //metodo de confirmacao da exclusao do objeto
  confirmarExclusao(lancamento: any) {

    //metodo que ira abrir a caixa de dialogo de confirmacao ou nao do documento.
    //ira se comunicar com o component ConfirmDialog
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',

      //passara a confirmacao do usuario de SIM ou NAO
      accept: () => {
        this.excluir(lancamento);
      }
      });
  }



  //metodo excluir
  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      this.dadosTabela.reset();

      //para ira ativar popup de confirmacao quando algum arquivo for excluído
      this.toast.success('Lançamento excluído com Sucesso!');
    })
    //ira receber o erro caso tenha algum na pesquisa
    .catch(erro => this.erroHandler.handle(erro));
  }
}
