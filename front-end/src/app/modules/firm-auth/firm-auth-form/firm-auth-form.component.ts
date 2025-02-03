import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-firm-auth-form',
  templateUrl: './firm-auth-form.component.html',
  styleUrls: ['./firm-auth-form.component.scss'],
  standalone: false
})
export class FirmAuthFormComponent {
  firm = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };
  confirmPassword = '';
  isLoginMode = true;

  constructor(private http: HttpClient) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.isLoginMode && this.firm.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const url = this.isLoginMode ? '/api/firms/login' : '/api/firms/register';
    this.http.post(url, this.firm).subscribe({
      next: response => {
        console.log(this.isLoginMode ? 'Firm logged in successfully' : 'Firm registered successfully', response);
      },
      error: error => {
        console.error(this.isLoginMode ? 'Error logging in firm' : 'Error registering firm', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
}