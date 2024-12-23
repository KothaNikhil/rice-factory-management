import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Transaction {
  transactionType: string;
  name: string;
  item: string | null;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {}

  // Add a new transaction
  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  // Get all transactions
  getTransactions(): Observable<Transaction[]> {
    return of(this.transactions);
  }
}