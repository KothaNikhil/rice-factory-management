import { Component, ViewChild } from '@angular/core';
import { CATEGORIES } from 'src/app/shared/constants/predefined-items';
import { NgForm } from '@angular/forms';
import { Transaction, TransactionService } from '../services/transaction.service';

@Component({
    selector: 'app-transactions-form',
    templateUrl: './transactions-form.component.html',
    styleUrls: ['./transactions-form.component.scss'],
    standalone: false
})
export class TransactionsFormComponent {
  @ViewChild('transactionForm') transactionForm: NgForm | undefined;
  
  categories = CATEGORIES; // Assume CATEGORIES is imported
  selectedCategory = null;
  selectedItemUnit = '';
  filteredItems: { id: number; name: string; quantity: number; unit: string; }[] | undefined;

  transaction: Transaction = {
    transactionType: '',
    name: '',
    item: null,
    quantity: null,
    price: null,
  };

  constructor(private transactionService: TransactionService) { }

  onCategoryChange(event: any) {
    const categoryId = +event.target.value;
    const category = this.categories.find(cat => cat.id === categoryId);
    this.filteredItems = category ? category.items : [];

    // Automatically select the first item if available
    if (this.filteredItems && this.filteredItems.length > 0) {
      this.transaction.item = this.filteredItems[0].name;
      this.onItemChange({ target: { value: this.transaction.item } });
    } else {
      this.transaction.item = '';
      this.selectedItemUnit = '';
    }
  }

  onItemChange(event: any) {
    const itemName = event.target.value;
    this.selectedItemUnit = this.filteredItems?.find(item => item.name === itemName)?.unit || '';
  }

  onSubmit() {
    this.transactionService.addTransaction(this.transaction).subscribe(
      (response) => {
        console.log('Transaction added successfully:', response);
  
        // Reset the form
        if (this.transactionForm) {
          this.transactionForm.reset();
        }
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
