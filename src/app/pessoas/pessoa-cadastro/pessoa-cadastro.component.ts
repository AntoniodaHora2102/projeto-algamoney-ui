import { Pessoa } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../pessoas.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
   private route: ActivatedRoute,
   private router: Router,

    private pessoaService: PessoasService,
    private toast: ToastyService,
    private erroHanderService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    
    const codigoPessoa = this.route.snapshot.params['codigo'];

    //verifica se o codigo ira retornar true ou false
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  salvar(form: NgForm) {
    //condicao que ira verificar a criar/solicitar/editar

    if (this.editando) {

      //ira chamar o metodo que atualizar as informacoes do formulario
        this.atualizarPessoa(form);
    }

    else {

      //ira chamar o metodo que ira salvar as informacoes no BD
      this.adicionarPessoa(form);
    }
  }


  //metodo para salvar os dados front para BackEnd
  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then( pessoaAdicionada => {

      this.toast.success('Pessoa Adicionada com Sucesso!');
     
      this.router.navigate(['/pessoas']);

    })
    .catch( erro => this.erroHanderService.handle(erro));
  }


  //metodo responsavel por atualizar pessoa
  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
        .then( pessoa => {
          this.pessoa = pessoa;

          this.toast.success('Cadastro atualizado com Sucesso!');

        }).catch( erro => this.erroHanderService.handle(erro));
  }

  //metodo que ira carregar as informacoes do  formaulario
  carregarPessoa(codigo: number) {

    //metodo buscarCodigo PessoaService
    this.pessoaService.buscarPorCodigo(codigo)
        .then( pessoa => {

          //ira buscar pessoa pelo codigo salvo no BD
          this.pessoa = pessoa;
       })
          .catch( erro => this.erroHanderService.handle(erro));
 
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  novo(form: NgForm) {
    
    //irá resetar as informações do formulário
    form.reset();

    //executa uma fumcao apos um tempo definido
    //sera executa apos um milisegundo
    //recurso javascript
    setTimeout(function() {
      //instanciamos o lancamento para que o mesmo retorne vazio
      this.pessoa = new Pessoa();
    }
    //para encontrar/manter o escopo de lancamento-cadastro.component
    .bind(this), 1);     

    //rota que será direcionada ao ser clicada
    this.router.navigate(['/pessoas/nova']);
}


}
