import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PREDEFINED_ITEMS } from '../shared/constants/predefined-items';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private predefinedItems = PREDEFINED_ITEMS;

  constructor() {}

  getItems(): Observable<any[]> {
    const allItems = this.predefinedItems.flatMap(category => category.items);
    return of(allItems);
  }

  getItemsByCategory(categoryId: number): Observable<any[]> {
    const category = this.predefinedItems.find(cat => cat.categoryId === categoryId);
    return of(category?.items || []);
  }
}
