import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
  standalone: false
})
export class TransactionsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['transactionType', 'name', 'item', 'quantity', 'price'];
  dataSource = new MatTableDataSource<any>();
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private transactionService: TransactionService) { }

  ngAfterViewInit(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.dataSource.data = transactions;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'transactiontype': return item.transactionType;
          case 'name': return item.name.toLowerCase();
          case 'item': return item.item.toLowerCase();
          default: return item[property];
        }
      };
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
