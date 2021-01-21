import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

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
  constructor( public auth: AuthService ) { }

  ngOnInit() {
  }

  criarNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }
}
