import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { NotAuthenticatedError } from '../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router) 
    { }

    handle(errorResponse: any) {
      //mensagem de error for string 
      let msg: string;

      if (typeof errorResponse === 'string') {
        msg = errorResponse;
      }
      //ira tratar a mensagem de error quando o refresh token expirar
      else if (errorResponse instanceof NotAuthenticatedError) { 
        msg = 'Sua Sessão Expirou!'
        this.router.navigate(['/login']);
      }

      else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {

        let errors;

        msg = "Erro ao proccessar a Solicitação";

        //tratamento da mensagem de permissao de exclusao
        if (errorResponse.status === 403) {
          msg = ' Você não tem permissão para realizar essa Ação!';
        }

        //tratamento do erro da mensagem da API que sera apresentada ao Usuario
        try {
          errors = errorResponse.json();
          msg = errors[0].mensagemUsuario;

        } catch (e) { }

        console.error('Ocorreu um erro' , errorResponse);

      //caso a condicao acima nao seja atendida sera apresentada a mensagem a abaixo
      } else {
        msg = 'Erro ao processar o Serviço remoto. Tente Novamente';
        console.error('Ocorreu um erro', errorResponse);
      }

      this.toasty.error(msg);
    }
  }

