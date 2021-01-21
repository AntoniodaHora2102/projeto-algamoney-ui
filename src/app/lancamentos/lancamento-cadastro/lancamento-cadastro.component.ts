import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { PessoasService } from './../../pessoas/pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';

import { ActivatedRoute, Router } from '@angular/router';

import { FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { equal } from 'assert';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];

  //classe de modelo
  lancamento = new Lancamento();

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private pessoaService: PessoasService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private toast: ToastyService,
    private errorHandlerService: ErrorHandlerService,

    //servico que altera o titulo da aba do sistema
    private title: Title
  ) { }

  ngOnInit() {

    //insere o novo titulo na aba
    this.title.setTitle('Novo Lançamento');
    //console.log(this.route.snapshot.params['codigo']);
    this.carregarCategoria();
    this.listarTodas();

    //ira verificar se o codigo existe
    const codigoLancamento =  this.route.snapshot.params['codigo'];

    //use o codigo retornar falso o ira detectar
      if (codigoLancamento) {

        //o metodo ira carregar o codigo
        //verifica qual o codigo chamado
        //depois verifica em qual codigo foi clicado
        this.carregarLancamento(codigoLancamento);
      }
  }

  //metodo para salvar os dados front para BackEnd
  adiconarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then( lancamentoAdicionado => {

      //caso esteja tudo correto a mensagem de sucesso sera exibida
      this.toast.success('Lancamento adicionado com Sucesso');

      //irá resetar as informações do formulário
     // form.reset();

      //instanciamos o lancamento para que o mesmo retorne vazio
     // this.lancamento = new Lancamento();
     this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch( erro => this.errorHandlerService.handle(erro));
  }
  

  //Metodo sera responsavel por verificar as acoes solicitadas na tela de pesquisa-lancemnto
  salvar(form: NgForm) {
    
    if (this.editando) {

      //metodo que ira realizar alteracao das informacoes do lancamneto
      this.atualizarLancamento(form);
    }

    else {

      //metodo que sera responsavel por enviar as informacoes ao banco de Dados
      this.adiconarLancamento(form);
    }
  }  

  atualizarLancamento(form: NgForm) {

    this.lancamentoService.atualizar(this.lancamento)
        .then( lancamento => {
        
        this.lancamento = lancamento;
        this.toast.success('lancamento Atualizado com Sucesso!');

        //ira atualizar o titulo da aba quando o houver edicao na descricao do lancamento
        this.atualizarTituloEdicao();
        
        //instanciamos o lancamento
        //this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandlerService.handle(erro));  
  }

  //ira carregar as informacoes do metodo listaCategorias
  carregarCategoria() {
    return this.categoriaService.listarCategorias()
    .then( categorias => {

      //map ira percorre por todo array de categorias e passara todas as informacoes
      //para o dropdown
      //o map cria um novo array com a informações já existente em categoria
      this.categorias = categorias.map(c => ({label: c.nome, value: c.codigo}));
    })
    .catch ( erro => this.errorHandlerService.handle(erro));
  }

  //lista as pessoas que estao salvas no BD
  listarTodas() {
    return this.pessoaService.listarTodas()
      .then( pessoas => {
        this.pessoas = pessoas.map( c => ({label: c.nome, value: c.codigo}));
      })
      .catch( erro => this.errorHandlerService.handle(erro));
  }


  //metodo que ira carregar as informacoes para edicao
  carregarLancamento(codigo: number) {
    
    //iremos buscar a informacao atraves do metodo buscarCodigo no LancamentoService
    this.lancamentoService.buscarPorCodigo(codigo)
      .then( lancamento => {

        //ira buscar o objeto lancamento
        this.lancamento = lancamento;

        //metodo de atualizacao do titulo da aba Edicao Lancamento
        this.atualizarTituloEdicao();
      })
        .catch( erro => this.errorHandlerService.handle(erro));
  }

  //ira retornar um Boolean que ira editar o <H1> da view ao clicar na opcao Editar ou Novo
  get editando() {
      return Boolean(this.lancamento.codigo);
  } 

  novo(form: NgForm) {
    
      //irá resetar as informações do formulário
      form.reset();

      //executa uma fumcao apos um tempo definido
      //sera executa apos um milisegundo
      //recurso javascript
      setTimeout(function() {
        //instanciamos o lancamento para que o mesmo retorne vazio
        this.lancamento = new Lancamento();
      }
      //para encontrar/manter o escopo de lancamento-cadastro.component
      .bind(this), 1);     

      //rota que será direcionada ao ser clicada
      this.router.navigate(['/lancamentos/novo']);
  }

  //metodo que ira alterar o titulo da aba dinamicamente
  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Lancamento: ${this.lancamento.descricao}`);
  }
}
