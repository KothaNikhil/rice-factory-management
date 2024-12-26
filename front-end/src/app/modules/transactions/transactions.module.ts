import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { FormsModule } from '@angular/forms';
import { TransactionsFormComponent } from './transactions-form/transactions-form.component';


@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsFormComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule
  ]
})
export class TransactionsModule { }
