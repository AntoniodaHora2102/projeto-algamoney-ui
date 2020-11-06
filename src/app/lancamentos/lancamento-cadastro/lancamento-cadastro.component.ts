import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { PessoasService } from './../../pessoas/pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';

import { ActivatedRoute } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

    private pessoaService: PessoasService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private toast: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    //console.log(this.route.snapshot.params['codigo']);
    this.carregarCategoria();
    this.listarTodas();
  }

  //metodo para salvar os dados front para BackEnd
  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {

      //caso esteja tudo correto a mensagem de sucesso sera exibida
      this.toast.success('Lancamento adicionado com Sucesso');

      //irá resetar as informações do formulário
      form.reset();

      //instanciamos o lancamento para que o mesmo retorne vazio
      this.lancamento = new Lancamento();
    })
    .catch( erro => this.errorHandlerService.handle(erro));
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

  listarTodas() {
    return this.pessoaService.listarTodas()
      .then( pessoas => {
        this.pessoas = pessoas.map( c => ({label: c.nome, value: c.codigo}));
      })
      .catch( erro => this.errorHandlerService.handle(erro));
  }
}
