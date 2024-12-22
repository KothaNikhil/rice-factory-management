import { Component } from '@angular/core';
import { CATEGORIES } from 'src/app/shared/constants/predefined-items';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  categories = CATEGORIES; // Assume CATEGORIES is imported
  selectedCategory = null;
  filteredItems: { id: number; name: string; quantity: number; unit: string; }[] | undefined;

  transaction = {
    transactionType: '',
    name: '',
    itemId: null,
    quantity: 0,
    price: 0,
  };

  onCategoryChange(event: any) {
    const categoryId = +event.target.value;
    const category = this.categories.find(cat => cat.id === categoryId);
    this.filteredItems = category ? category.items : [];
  }

  onSubmit() {
    console.log('Transaction Data:', this.transaction);
    // Process the form submission
  }
}
