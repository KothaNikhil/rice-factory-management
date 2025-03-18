import { Component } from '@angular/core';
import { TransactionType } from './services/transaction.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss'],
    standalone: false
})
export class TransactionsComponent {
    transactionTypes = Object.values(TransactionType);
    selectedTransactionType: TransactionType = TransactionType.Purchase;

    selectTransactionType(type: TransactionType) {
        this.selectedTransactionType = type;
    }
}
