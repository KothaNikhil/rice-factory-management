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
    console.log("transaction", this.transaction);
    this.transactionService.addTransaction(this.transaction);

    // Reset the form
    this.transaction = {
      transactionType: '',
      name: '',
      item: null,
      quantity: 0,
      price: 0,
    };
  }

  LogTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      console.log("transactions: ", transactions);
    });
  }
    
}
