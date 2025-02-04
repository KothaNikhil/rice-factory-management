import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  isLoginOrRegistrationFail: any;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.isLoginOrRegistrationFail = false; // Reset on mode toggle
  }

  onSubmit() {
    this.isLoginOrRegistrationFail = false;
    let apiUrl = 'http://localhost:5000';
    if (!this.isLoginMode && this.firm.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const url = this.isLoginMode ? '/api/firms/login' : '/api/firms/register';
    this.http.post(apiUrl + url, this.firm).subscribe({
      next: (response: any) => {
        console.log(this.isLoginMode ? 'Firm logged in successfully' : 'Firm registered successfully', response);
        this.cookieService.set('authToken', response.token, { path: '/', secure: true, sameSite: 'Strict' }); // Store the token in cookies
        if(!this.isLoginMode) 
          this.toggleMode();
        this.router.navigate(['/transactions']);
      },
      error: error => {
        console.error(this.isLoginMode ? 'Error logging in firm' : 'Error registering firm', error);
        this.isLoginOrRegistrationFail = true;
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
}