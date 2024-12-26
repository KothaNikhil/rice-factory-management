import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';

export interface Transaction {
  transactionType: string;
  name: string;
  item: string | null;
  quantity: number | null;
  price: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [];
  private apiUrl = 'http://localhost:5000/api/transactions';

  constructor(private http: HttpClient) {}

  // Add a new transaction
  addTransaction(transaction: Transaction): Observable<Transaction> {
    this.transactions.push(transaction);
    return this.http.post<Transaction>(this.apiUrl, transaction).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to add transaction'));
      })
    );
  }

  // Get all transactions
  getTransactions(): Observable<Transaction[]> {
    // return of(this.transactions);
    return this.http.get<Transaction[]>(this.apiUrl);
  }
}