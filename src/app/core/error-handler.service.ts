import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

    handle(errorResponse: any) {
      //mensagem de error for string 
      let msg: string;

      if (typeof errorResponse === 'string') {
        msg = errorResponse;
      }

      else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {

        let errors;

        msg = "Erro ao proccessar a Solicitação";

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

