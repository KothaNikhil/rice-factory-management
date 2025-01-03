import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, Subject, tap } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Transaction {
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

  constructor(private http: HttpClient) {}

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

  getTransactions(): Observable<Transaction[]> {
    // return this.http.get<Transaction[]>(this.apiUrl).pipe(delay(2000));
    return this.http.get<Transaction[]>(this.apiUrl);
  }
}