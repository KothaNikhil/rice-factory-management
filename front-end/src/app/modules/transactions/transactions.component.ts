import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
    standalone: false
})
export class TransactionsComponent implements AfterViewInit {
    displayedColumns: string[] = ['transactiontype', 'name', 'item', 'quantity', 'price'];
    dataSource = new MatTableDataSource<any>();
    private _liveAnnouncer = inject(LiveAnnouncer);
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private transactionService: TransactionService) {}

    ngAfterViewInit(): void {
        this.transactionService.getTransactions().subscribe(transactions => {
            this.dataSource.data = transactions;
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = (item, property) => {
                switch (property) {
                    case 'transactiontype': return item.transactionType;
                    default: return item[property];
                }
            };
        });
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
