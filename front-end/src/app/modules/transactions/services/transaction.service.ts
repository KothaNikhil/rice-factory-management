import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, Subject, tap } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Transaction {
  id?: number; // Add this line
  transactionType: string;
  name: string;
  item: string | null;
  quantity: number | null;
  price: number | null;
  dateCreated: Date | null;
  dateUpdated: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:5000/api/transactions';
  private transactionAddedSource = new Subject<Transaction>();
  transactionAdded$ = this.transactionAddedSource.asObservable();
  private editTransactionSource = new Subject<Transaction>();
  editTransaction$ = this.editTransactionSource.asObservable();

  constructor(private http: HttpClient) {
    this.getTransactions();
  }

  // Add a new transaction
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to add transaction'));
      }),
      tap((newTransaction) => {
        this.transactionAddedSource.next(newTransaction);
      })
    );
  }

  getTransactions(): void {
    this.http.get<Transaction[]>(this.apiUrl).pipe(
      tap((transactionsList) => {
        transactionsList.forEach((transaction) => {
          this.transactionAddedSource.next(transaction);
        });
      }),
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch transactions'));
      })
    ).subscribe();
  }

  editTransaction(transaction: Transaction) {
    this.editTransactionSource.next(transaction);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${transaction.id}`, transaction).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to update transaction'));
      }),
      tap((updatedTransaction) => {
        this.transactionAddedSource.next(updatedTransaction);
      })
    );
  }

}