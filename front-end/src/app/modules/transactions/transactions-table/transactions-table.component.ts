import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionService } from '../services/transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
  standalone: false
})
export class TransactionsTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['update','transactionType', 'name', 'item', 'quantity', 'price', 'dateCreated', 'dateUpdated'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;
  private transactionSubscription!: Subscription;

  constructor(private transactionService: TransactionService) { }

  ngAfterViewInit(): void {
    this.transactionService.transactionAdded$.subscribe(transaction => {
      this.dataSource.data = [...this.dataSource.data, transaction];
    });
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'transactiontype': return item.transactionType;
        case 'name': return item.name.toLowerCase();
        case 'item': return item.item.toLowerCase();
        case 'dateCreated': return new Date(item.dateCreated);
        case 'dateUpdated': return new Date(item.dateUpdated);
        default: return item[property];
      }
    };
    this.sort.sort({ id: 'dateCreated', start: 'desc', disableClear: true });
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    if (this.transactionSubscription) {
      this.transactionSubscription.unsubscribe();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  editTransaction(transaction: any) {
    this.transactionService.editTransaction(transaction);
  }
}
