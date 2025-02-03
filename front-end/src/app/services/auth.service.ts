import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Implement your authentication check logic here
    // For example, check if a valid token exists in local storage
    const token = localStorage.getItem('token');
    return !!token;
  }
}
