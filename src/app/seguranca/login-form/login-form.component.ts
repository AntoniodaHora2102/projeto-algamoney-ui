import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private erroHandler: ErrorHandlerService,
    private router: Router,
    private toast: ToastyService

    ) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() =>{

        //usuario e senha digitados corretamente a pagina será direcionada para LANCAMENTOS
        this.router.navigate(['/lancamentos']);

        //mensagem de sucesso
        this.toast.success('Autenticação Realizada com Sucessso!');

      }).catch(erro => {
        
        //iremos chamar o erroHandler caso o erro recebido seja um string
        this.erroHandler.handle(erro);
       });
  }
}
