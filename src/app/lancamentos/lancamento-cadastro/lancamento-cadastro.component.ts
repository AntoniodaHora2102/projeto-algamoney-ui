import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 },
  ];

  pessoas = [
    { label: 'Jéssica', value: 1 },
    { label: 'Antonio', value: 2 },
    { label: 'Paulo', value: 3 },
  ];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);
  }

}
