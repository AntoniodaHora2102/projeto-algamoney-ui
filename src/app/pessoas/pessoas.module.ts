import { InputMaskModule } from 'primeng/inputmask';
import { PesquisaPessoaComponent } from './pesquisa-pessoa/pesquisa-pessoa.component';
import { PessoaGridComponent } from './pessoa-grid/pessoa-grid.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoaGridComponent,
    PesquisaPessoaComponent
  ],
  exports: [
    PesquisaPessoaComponent,
    PessoaCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    CurrencyMaskModule
  ]
})
export class PessoasModule { }
