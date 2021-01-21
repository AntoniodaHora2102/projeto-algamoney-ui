
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { FormsModule } from '@angular/forms';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
  exports: [],

  imports: [
    CommonModule,
    FormsModule,
   

    SharedModule,
    LancamentosRoutingModule,

    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule
  ]
})
export class LancamentosModule { }
