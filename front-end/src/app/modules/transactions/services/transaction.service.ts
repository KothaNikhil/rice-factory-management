import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, Subject, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export enum TransactionType {
  Purchase = 'purchase',
  Sale = 'sale',
  Salary = 'salary'
}

export interface Transaction {
  _id?: string;
  transactionType: TransactionType;
  name: string;
  item: string | null;
  quantity: number | null;
  price: number | null;
  amount?: number | null; // Ensure this line is present
  dateCreated: string | null;
  dateUpdated: Date[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:5000/api/transactions';
  private transactionAddedSource = new Subject<Transaction>();
  transactionAdded$ = this.transactionAddedSource.asObservable();
  private transactionUpdatedSource = new Subject<Transaction>();
  transactionUpdated$ = this.transactionUpdatedSource.asObservable();
  private editTransactionSource = new Subject<Transaction>();
  editTransaction$ = this.editTransactionSource.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.getTransactions(1, 10);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Add a new transaction
  addTransaction(transaction: Transaction): Observable<Transaction> {
    const headers = this.getAuthHeaders();
    return this.http.post<Transaction>(this.apiUrl, transaction, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to add transaction'));
      }),
      tap((newTransaction) => {
        this.transactionAddedSource.next(newTransaction);
      })
    );
  }

  getTransactions(page: number, pageSize: number): Observable<Transaction[]> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Transaction[]>(this.apiUrl, { headers, params }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch transactions'));
      })
    );
  }

  getTransactionNames(): Observable<string[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<string[]>(`${this.apiUrl}/names`, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to fetch transaction names'));
      })
    );
  }

  editTransaction(transaction: Transaction) {
    this.editTransactionSource.next(transaction);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const headers = this.getAuthHeaders();
    return this.http.put<Transaction>(`${this.apiUrl}/${transaction._id}`, transaction, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to update transaction'));
      }),
      tap((updatedTransaction) => {
        this.transactionUpdatedSource.next(updatedTransaction);
      })
    );
  }

  deleteTransaction(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Failed to delete transaction'));
      })
    );
  }
}