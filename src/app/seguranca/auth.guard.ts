import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /*deve ser inserido o AuthService no constructor para que seja permitido 
  o acesso ao metodo temQualquerPermissao*/
  constructor (
    private auth: AuthService,
    private router: Router
    ) {}

    //guarda de rotas
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //iremos verificar se há um accessToker / refreshToken valido
      //nao encontrando o usuario ser direcionado para a tela de LOGIN.
      if (this.auth.isAccessTokenInvalido()) {
        console.log('Navegacao com o token invalido... Obtendo um novo access Token');

        return this.auth.obterNovoAccessToken()
        .then(() => {
          
          //ira verificar o token esta invalido
          // se retornar falso e porque nao foi criado
          if(this.auth.isAccessTokenInvalido()) {

            this.router.navigate(['/login']);
            return false;
          }
          
          return true;
        });

      }

      //nao permitir o acesso do usuario a rota
      else if (next.data.roles && !this.auth.temQualquerPermissao(next.data.roles)) {
        
        this.router.navigate(['/nao-autotizado']);
        return false;
      }
  
      //se retornar true ira continuar o navegacao
      return true;
  }
  
}
