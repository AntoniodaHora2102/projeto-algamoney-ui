import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = true;

  exibirMenu() {
    this.exibindoMenu = !this.exibindoMenu;
  }
  constructor( 
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler : ErrorHandlerService,
    private router: Router
    
    ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(()=> {
        //ira direcionar o usuario na tela de login
        this.router.navigate(['/login']);

      })
      .catch(erro => this.errorHandler.handle(erro));
  } 

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }
}
