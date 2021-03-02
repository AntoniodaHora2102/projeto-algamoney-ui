import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

//class criada apenas para Lancar um erro quando o refresh Token expirar
export class NotAuthenticatedError {}

//@Injectable() -> não necessita ser utilizado mais
export class MoneyHttp extends AuthHttp {

  constructor(
    private auth: AuthService,
    options: AuthConfig,
    http: Http, defOpts?: RequestOptions
  ) {
      //super construtor da classe AuthHttp
    super(options, http, defOpts);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.delete(url, options));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.patch(url, options));
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.head(url, options));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.options(url, options));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.get(url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.post(url, body, options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.fazerRequisicao(() => super.put(url, body, options));
  }

  //requisao que ira verificar se o accesstoken esta invalido ou nao 
  private fazerRequisicao(fn: Function): Observable<Response> {
    
    //vamos verificar se ha um token valido ou nao
    if (this.auth.isAccessTokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

      //criamos a variavel chamdaNovoAccessToken para ele retorna a resposta do novo access token
      //ira obter novo access token de forma automatica
      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .then(() => {

          //verifica se o access estiver invalido sera lancado o error
          if (this.auth.isAccessTokenInvalido()) {
            throw new NotAuthenticatedError();
          }

          //retorna um promessa com o token  
          return fn().toPromise();
        });

      return Observable.fromPromise(chamadaNovoAccessToken);

    } else {
      return fn();
    }
  }

}