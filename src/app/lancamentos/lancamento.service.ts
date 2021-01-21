import { Lancamento } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { AuthHttp } from 'angular2-jwt';

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
  //o http será alterado para o AuthHttp 
  constructor(private http: AuthHttp) {}

        //metodo que ira realiza a pesquisa no backEnd e trazer para o frontEnd
        //para realizar a pesquisa personalizada iremos utilizar um filtro no metodo pesquisar
        pesquisar(filtro: LancamentoFiltro): Promise<any> {

        //variavel que sera utilizado para realizar a filtro da pesquisa
        const params = new URLSearchParams();

        //chamada da api 
        // const headers = new Headers(); (O headers não serão mais o utilizado devido a utilizacao do AuthHttp)
         //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='); (Não será mais necessaria a seguranca basic)

         //ira inserir a quantidade de pagina mais a quantidade de item por pagina
         params.set('page', filtro.pagina.toString());
         params.set('size', filtro.itensPorPagina.toString());


          //passaremos o valor que sera pesquisado em descricao
          if(filtro.descricao) {
              params.set('descricao', filtro.descricao);
          }

          if(filtro.dataVencimentoInicio) {
            params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
          }

          if(filtro.dataVencimentoFim) {
            params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
          }

         return this.http.get(`${this.lancamentosUrl}?resumo`, { search: params })
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

        // const headers = new Headers();
        // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

         return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
         .toPromise()
         .then(() => null);

      }


      //enviar informações para o backEnd através do formulario
      adicionar(lancamento: Lancamento): Promise<Lancamento> {

      //  const headers = new Headers();
      //   headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      //   headers.append('Content-Type', 'application/json');

         return this.http.post(this.lancamentosUrl,
          JSON.stringify(lancamento))
            .toPromise().then( response => response.json());
      }


      atualizar(lancamento: Lancamento): Promise<Lancamento> {
        
        //const headers = new Headers();
        //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
        //headers.append('Content-Type', 'application/json');

        //metodo que irá atualizar as informações do Lancamento
        return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
                JSON.stringify(lancamento))
                .toPromise()
                .then(response => {
                  
                  const lancamentoAlterado =  response.json() as Lancamento;

                  this.converterStringsParaDatas([lancamentoAlterado]);
                  return lancamentoAlterado;
                });
      }
      

      //metodo que ira buscar a informação pelo ID da pesquisa
      buscarPorCodigo(codigo: number): Promise<Lancamento> {

       // const headers = new Headers();
       // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
       
        return this.http.get(`${this.lancamentosUrl}/${codigo}`)
                .toPromise()
                .then( response => {

                  const lancamento = response.json() as Lancamento;

                  this.converterStringsParaDatas([lancamento]);
                  return lancamento;
                })
      }

      //metodo que irá converter a data do Tipo String para DATE
      private converterStringsParaDatas(lancamentos: Lancamento[]) {
        
        for ( const lancamento of lancamentos) {
          lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
          
          if (lancamento.datapagamento === null){
             //funçãõ criada apenas para que o banco não retorne a informacao NULL,
             //para que o formato data do campo vazio não fique assim: NaN/NaN/NaN
            }
          
          //se caso o campo não estiver vazio , ele ira retorna o campo preenchido
          else {
            lancamento.datapagamento = moment(lancamento.datapagamento, 'YYYY-MM-DD').toDate();
          }
          
        }
      }

}
