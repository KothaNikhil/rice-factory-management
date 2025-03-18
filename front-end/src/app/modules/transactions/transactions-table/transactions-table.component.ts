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
  displayedColumns: string[] = ['update','transactionType', 'name', 'item', 'quantity', 'amount', 'dateCreated', 'dateUpdated', 'delete'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;
  private transactionSubscription!: Subscription;
  private page = 0;
  private pageSize = 16;

  constructor(private transactionService: TransactionService) { }

  ngAfterViewInit(): void {
    this.loadTransactions();
    console.log("test");
    this.transactionService.transactionAdded$.subscribe(transaction => {
      console.log('Transaction added:', transaction);
      this.refreshTable();
    });
    this.transactionService.transactionUpdated$.subscribe(transaction => {
      console.log('Transaction updated:', transaction);
      this.refreshTable();
    });
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'transactiontype': return item.transactionType;
        case 'name': return item.name.toLowerCase();
        case 'item': return item.item.toLowerCase();
        case 'dateCreated': return new Date(item.dateCreated);
        case 'dateUpdated': return new Date(item.dateUpdated);
        case 'amount': return item.amount;
        default: return item[property];
      }
    };
    this.sort.sort({ id: 'dateCreated', start: 'desc', disableClear: true });
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

  deleteTransaction(transaction: any) {
    this.transactionService.deleteTransaction(transaction._id).subscribe({
      next: () => {
        this.refreshTable();
      },
      error: (error) => {
        console.error('Error deleting transaction:', error);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onScroll(event: any) {
    const tableContainer = event.target;
    if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight) {
      console.log('End of table');
      this.loadTransactions();
    }
  }

  private loadTransactions() {
    this.isLoading = true;
    this.transactionService.getTransactions(this.page, this.pageSize).subscribe(transactions => {
      transactions.forEach(transaction => {
        if (transaction.transactionType === 'purchase' || transaction.transactionType === 'sale') {
          if(transaction.quantity && transaction.price){
            transaction.amount = transaction.price * transaction.quantity;}
        }
      });
      console.log('Transactions:', transactions);
      this.dataSource.data = [...this.dataSource.data, ...transactions];
      this.page++;
      this.isLoading = false;
    });
  }

  private refreshTable() {
    this.page = 0;
    this.dataSource.data = [];
    this.loadTransactions();
  }
}
