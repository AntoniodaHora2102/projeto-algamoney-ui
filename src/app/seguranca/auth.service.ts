import { ErrorHandler, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { promise } from 'protractor';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //variavel de acesso ao endereco da requisicao de login da api
  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  //será um objeto javascript
  jwtPayload: any;
  
  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) { this.carregarToken(); }

  //metodo será enviadas as informações do copo da api 
  //para termos acesso ao login da aplicacao
  login(usuario: string, senha: string): Promise<void> {

    //variaveis de solicitação
    const headers = new Headers();
    headers.append('Authorization' , ' Basic YW5ndWxhcjphZG1pbg==');

    //envia o corpo do http para informar ao servidor o tipo da informacao
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    //ira receber os parametros do usuario para ter acesso aplicacao
    //corpo da solicitacao
    const body = `username=${usuario}&password=${senha}&grant_type=password`; 

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then( response => {
        console.log(response);

        //iremos chamar a funcao armazenarToken passando um parametro para ela
        this.armazenarToken(response.json().access_token);

      }).catch(response => {

        //ira verifica se o usuario digitou email e/ou senha incorretas
        if (response.status === 400) {

          // iremos transformar o objeto em json
          const responseJson =  response.json();

          //iremos verificar se a resposta obtida e do tipo  'invalid_grant' - informacao coletada da api (POSTMAN)
          if (responseJson.error === 'invalid_grant') {

            //mensagem que será exibida para o usuario caso haja algum erro na informacao do usuario e sneha
            return Promise.reject('Usuário ou Senha Invalidos!');
          }
        }

        //caso o codigo de erro nao for 400 (invalid_grant) 
        //iremos passar a resposta para o usuario
        return Promise.reject(response);

      });

  }

   //metodo que ira verificar se o usuário tem ou nao permissao para acessar aos menus
   temPermissao( permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  //metodo para obter um access token atraveś do refreshToken
  obterNovoAccessToken(): Promise<void> {

    //variaveis de solicitação
    const headers = new Headers();
    headers.append('Authorization' , ' Basic YW5ndWxhcjphZG1pbg==');


    //envia o corpo do http para informar ao servidor o tipo da informacao
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';
    
    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
                .toPromise()
                .then( response => {
                  this.armazenarToken(response.json().access_token);

                  console.log('Novo access token criado');
                  return Promise.resolve(null);

                }).catch( response => {

                  console.error('Erro ao renovar Token', response);
                  return Promise.resolve(null);
                });

  }

  //funcao que ira receber o token do tipo string
  private armazenarToken(token: string) {

    //decodeToken ira decodificar o token que receber do jwtPayload 
    this.jwtPayload = this.jwtHelper.decodeToken(token);
  
    //iremos armazenar o token no navegador do usuário no local storage
    localStorage.setItem('token', token);    
  }

  //metodo que ira pegar o token do local Storage
  private carregarToken() {
    const token = localStorage.getItem('token');

    //verifica se ha algum access_token salvo no local 
    if (token) {

      //ira decodificar o token
      this.armazenarToken(token);
    }
  }
  
}
