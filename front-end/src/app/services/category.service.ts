import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from '../shared/constants/predefined-items';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories = CATEGORIES;

  constructor() {}

  // Fetch all categories
  getCategories(): Observable<{ id: number; name: string }[]> {
    return of(this.categories); // Simulate an API call
  }

  // Add a new category
  addCategory(category: { id: number; name: string, items: any }): void {
    this.categories.push(category);
  }

  // Delete a category
  deleteCategory(id: number): void {
    this.categories = this.categories.filter((category) => category.id !== id);
  }
}
