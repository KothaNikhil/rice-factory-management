import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  isRegistrationFail: any;

  constructor(private http: HttpClient, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.isRegistrationFail = false;
    let apiUrl = 'http://localhost:5000';
    if (!this.isLoginMode && this.firm.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const url = this.isLoginMode ? '/api/firms/login' : '/api/firms/register';
    this.http.post(apiUrl + url, this.firm).subscribe({
      next: (response: any) => {
        console.log(this.isLoginMode ? 'Firm logged in successfully' : 'Firm registered successfully', response);
        localStorage.setItem('authToken', response.token); // Store the token
        this.isLoginMode = true;
        this.router.navigate(['/transactions']);
      },
      error: error => {
        console.error(this.isLoginMode ? 'Error logging in firm' : 'Error registering firm', error);
        this.isRegistrationFail = true;
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
}