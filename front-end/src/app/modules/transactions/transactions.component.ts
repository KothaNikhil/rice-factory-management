import { Component } from '@angular/core';
import { CATEGORIES } from 'src/app/shared/constants/predefined-items';
import { Transaction, TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  categories = CATEGORIES; // Assume CATEGORIES is imported
  selectedCategory = null;
  selectedItemUnit = '';
  filteredItems: { id: number; name: string; quantity: number; unit: string; }[] | undefined;

  transaction: Transaction = {
    transactionType: '',
    name: '',
    item: null,
    quantity: 0,
    price: 0,
  };

  constructor(private transactionService: TransactionService) { }

  onCategoryChange(event: any) {
    const categoryId = +event.target.value;
    const category = this.categories.find(cat => cat.id === categoryId);
    this.filteredItems = category ? category.items : [];
  }

  onItemChange(event: any) {
    const itemName = event.target.value;
    this.selectedItemUnit = this.filteredItems?.find(item => item.name === itemName)?.unit || '';
  }

  onSubmit() {
    this.transactionService.addTransaction(this.transaction).subscribe(
      (response) => {
        console.log('Transaction added successfully:', response);
  
        // Optionally, refresh the transactions list or display a success message
        this.LogTransactions(); 
  
        // Reset the form
        this.transaction = {
          transactionType: '',
          name: '',
          item: null,
          quantity: 0,
          price: 0,
        };
      },
      (error) => {
        console.error('Error adding transaction:', error);
      }
    );
  }

  LogTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        console.log('Transactions fetched:', transactions);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }
    
}
