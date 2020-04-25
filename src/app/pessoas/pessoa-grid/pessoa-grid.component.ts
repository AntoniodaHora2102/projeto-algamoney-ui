import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoa-grid',
  templateUrl: './pessoa-grid.component.html',
  styleUrls: ['./pessoa-grid.component.css']
})
export class PessoaGridComponent implements OnInit {

  @Input() pessoas = [];

  constructor() { }

  ngOnInit(): void {
  }

}
