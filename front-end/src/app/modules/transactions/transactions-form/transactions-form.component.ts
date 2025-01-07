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
    dateCreated: null,
    dateUpdated: null,
  };

  currentDateTime: string = new Date().toISOString().slice(0, 16); // Add this line
  isEditMode = false;

  constructor(private transactionService: TransactionService) {
    this.transactionService.editTransaction$.subscribe(transaction => {
      this.transaction = { ...transaction };
      this.isEditMode = true;
    });
  }

  getCategoryByItem(itemName: string | null) {
    if (!itemName) return null;
    return this.categories.find(category => category.items.some(item => item.name === itemName));
  }

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
    if (this.isEditMode) {
      this.transactionService.updateTransaction(this.transaction).subscribe({
        next: () => {
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating transaction:', error);
        }
      });
    } else {
      this.transaction.dateUpdated = this.transaction.dateCreated;

      this.transactionService.addTransaction(this.transaction).subscribe({
        next: () => {
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding transaction:', error);
        }
      });
    }
  }

  resetForm() {
    if (this.transactionForm) {
      this.transactionForm.reset();
    }
    this.isEditMode = false;
  }
}
