import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { FormsModule } from '@angular/forms';
import { TransactionsFormComponent } from './transactions-form/transactions-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionsFormComponent,
    TransactionsTableComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule
  ]
})
export class TransactionsModule { }
