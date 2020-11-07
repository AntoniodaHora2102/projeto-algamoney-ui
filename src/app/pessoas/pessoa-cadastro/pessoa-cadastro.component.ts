import { Pessoa } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../pessoas.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(

    private pessoaService: PessoasService,
    private toast: ToastyService,
    private erroHanderService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  //metodo para salvar os dados front para BackEnd
  salvar(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {

      this.toast.success('Pessoa Adicionada com Sucesso!');
      form.reset();

      this.pessoa = new Pessoa();

    })
    .catch( erro => this.erroHanderService.handle(erro));
  }


}
