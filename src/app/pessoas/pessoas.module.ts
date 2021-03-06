import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { PessoasRoutingModule } from './pessoas-routing.module';


import { InputMaskModule } from 'primeng/inputmask';
import { PesquisaPessoaComponent } from './pesquisa-pessoa/pesquisa-pessoa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';


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
    PesquisaPessoaComponent
  ],
  exports: [],
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
    CurrencyMaskModule,

    SharedModule,

    PessoasRoutingModule
  ]
})
export class PessoasModule { }
