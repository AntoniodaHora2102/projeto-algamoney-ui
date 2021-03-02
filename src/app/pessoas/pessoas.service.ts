import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Pessoa } from '../core/model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'src/environments/environment';

export class PessoasFiltro {
  //filtrando pessoas pelo nome
  nome: string;

  //quantidade de paginas e itens que serao carregados
  pagina = 0;
  itensPorPagina = 4;
}


@Injectable()
export class PessoasService {

  //url para carregar as informacoes da API
  //pessoasUrl = 'http://localhost:8080/pessoas';

  pessoasUrl : string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

   pesquisar(filtro: PessoasFiltro): Promise<any> {

    //passaremos o paramentos da consulta da url
    const params = new URLSearchParams();

    //chamada da api
    //const headers = new Headers();

    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    //ira inserir a quantidade de pagina mais a quantidade de item por pagina
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
       params.set('nome',  filtro.nome);

    }

    //ira retornar a consulta realizada ao banco atraves da api
    return this.http.get(`${this.pessoasUrl}`, { search: params})
        .toPromise()
        .then(response => {
          const responseJson = response.json();
          const pessoas = responseJson.content;

          //ira retornar os objetos referente a lancamento
          const resultado = {
            pessoas,

            //retorna as informacoes coleta pela api ou seja o total de informacao por pagina
            total: responseJson.totalElements
          };

          return resultado;
        })
  }

  listarTodas(): Promise<any> {
    //const headers = new Headers();
    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl)
    .toPromise()
    .then(response => response.json().content);
  }


    //metodo excluir lancamento
    excluir(codigo: number): Promise <void> {

    //  const headers = new Headers();
    //  headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);

  }

  //mudar status de ativo para inativo
  mudarStatus(codigo: number , ativo: boolean): Promise <void> {
    //const headers = new Headers();
    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    //headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
    .toPromise()
    .then(() => null);
  }

  //IRA ENVIAR AS INFORMACOES PARA DO FRONT PARA O BACKEND
  adicionar(pessoa: Pessoa): Promise<void> {

    //const headers = new Headers();
      //   headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      //   headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
    .toPromise()
    .then( response => response.json());
  }

  //metodo que ira atualizar as informacoes do formulario apos atualizado
  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    //const headers = new Headers();
    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    //headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
                .toPromise()
                .then( response => {

                  const pessoaAlterada = response.json() as Pessoa;

                  return pessoaAlterada;

                });

  }

  //metodo que ira buscar a informacao pelo ID da Pesquisa
  buscarPorCodigo(codigo: number): Promise<Pessoa> {

   // const headers = new Headers();
   // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoasUrl}/${codigo}`)
              .toPromise()
              .then( response => {

                const pessoa = response.json() as Pessoa;

                return pessoa;
              })

  }

}
