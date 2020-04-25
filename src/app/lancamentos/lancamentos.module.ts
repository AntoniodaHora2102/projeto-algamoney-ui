import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
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

import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent,
    LancamentosGridComponent
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    SharedModule,

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
