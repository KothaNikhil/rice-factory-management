import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from 'src/app/shared/constants/predefined-items';

@Component({
    selector: 'app-stock-management',
    templateUrl: './stock-management.component.html',
    styleUrls: ['./stock-management.component.scss'],
    standalone: false
})
export class StockManagementComponent implements OnInit {
  categories = CATEGORIES;

  constructor() { }

  ngOnInit(): void {
    
  }
}