import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  //iremos informar a url do logout
  //tokenRevokeUrl = 'http://localhost:8080/tokens/revoke';

  tokenRevokeUrl: string;


  constructor(
    private http: Http,
    private auth: AuthService
  ) { 
    this.tokenRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  //metodo que ira realizar a limpeza do refresh token
  logout() {

    //ira limpar o refresh Token
    return this.http.delete(this.tokenRevokeUrl, {withCredentials: true })
              .toPromise()
              .then(()=> {
                //ira limpar o access token
                this.auth.limparAccessToken();
              });
  }
}
