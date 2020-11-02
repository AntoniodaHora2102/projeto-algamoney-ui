import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

//interface sera alterado para class para que possa recebr os novos atributos.
export class LancamentoFiltro {
  descricao: string;

  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;

  pagina = 0;
  itensPorPagina = 4;
}

@Injectable()
export class LancamentoService {

  //chamada da url
  lancamentosUrl = 'http://localhost:8080/lancamento';

  //serivco http
  constructor(private http: Http) {}

        //metodo que ira realiza a pesquisa no backEnd e trazer para o frontEnd
        //para realizar a pesquisa personalizada iremos utilizar um filtro no metodo pesquisar
        pesquisar(filtro: LancamentoFiltro): Promise<any> {

        //variavel que sera utilizado para realizar a filtro da pesquisa
        const params = new URLSearchParams();

        //chamada da api
         const headers = new Headers();
         headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

         //ira inserir a quantidade de pagina mais a quantidade de item por pagina
         params.set('page', filtro.pagina.toString());
         params.set('size', filtro.itensPorPagina.toString());


          //passaremos o valor que sera pesquisado em descricao
          if(filtro.descricao) {
              params.set('descricao', filtro.descricao);
          }

          if(filtro. dataVencimentoInicio) {
            params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
          }

          if(filtro. dataVencimentoFim) {
            params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
          }

         return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params })
        .toPromise()
        .then(response => {
          const responseJson = response.json();
          const lancamentos = responseJson.content;

          //ira retornar os objetos referente a lancamento
          const resultado = {
            lancamentos,

            //retorna as informacoes coleta pela api ou seja o total de informacao por pagina
            total: responseJson.totalElements
          };

          return resultado;
         })

      }

      //metodo excluir lancamento
      excluir(codigo: number): Promise<void> {

         const headers = new Headers();
         headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

         return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers})
         .toPromise()
         .then(() => null);

      }
}
