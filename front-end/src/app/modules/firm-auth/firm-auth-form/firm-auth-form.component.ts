import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { API_ENDPOINTS, CONSTANTS, ERROR_MESSAGES, MESSAGES } from '../../../constants/constants';

export enum FirmAuthFormMode {
  Login = 'login',
  Register = 'register',
  Update = 'update'
}

@Component({
  selector: 'app-firm-auth-form',
  templateUrl: './firm-auth-form.component.html',
  styleUrls: ['./firm-auth-form.component.scss'],
  standalone: false
})
export class FirmAuthFormComponent {
  firm = { name: '', email: '', phone: '', password: ''};
  FirmAuthFormMode = FirmAuthFormMode;
  confirmPassword = '';

  private _formMode: FirmAuthFormMode = FirmAuthFormMode.Login;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    if(router.url === '/register') {
      this.formMode = FirmAuthFormMode.Register;
    }
    else if(router.url === '/update') {
      this.formMode = FirmAuthFormMode.Update;
    }
    else {
      this.formMode = FirmAuthFormMode.Login;
    }
  }

  get formMode() {
    return this._formMode;
  }

  set formMode(value: FirmAuthFormMode) {
    this._formMode = value;
  }

  get isLoginMode() { 
    return this.formMode === FirmAuthFormMode.Login; 
  }

  onSubmit() {
    switch(this.formMode) {
      case FirmAuthFormMode.Login:
        this.login();
        break;
      case FirmAuthFormMode.Register:
        this.register();
        break;
      case FirmAuthFormMode.Update:
        this.update();
        break;
    }
  }

  update() {
    validatePassword(this.firm.password, this.confirmPassword);

    const url = API_ENDPOINTS.UPDATE;
    this.http.put(CONSTANTS.API_URL + url, this.firm).subscribe({
      next: (response: any) => {
        alert(MESSAGES.UPDATE_SUCCESS);
        this.router.navigate(['/transactions']);
      },
      error: error => {
        console.error(ERROR_MESSAGES.ERROR_UPDATE, error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  register() {
    validatePassword(this.firm.password, this.confirmPassword);

    const url = API_ENDPOINTS.REGISTER;
    this.http.post(CONSTANTS.API_URL + url, this.firm).subscribe({
      next: (response: any) => {
        alert(MESSAGES.REGISTER_SUCCESS);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error(ERROR_MESSAGES.ERROR_REGISTER, error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  private login() {
    const url = API_ENDPOINTS.LOGIN;
    this.http.post(CONSTANTS.API_URL + url, this.firm).subscribe({
      next: (response: any) => {
        this.cookieService.set('authToken', response.token, { path: '/', secure: true, sameSite: 'Strict' });
        this.router.navigate(['/transactions']);
      },
      error: error => {
        console.error(ERROR_MESSAGES.ERROR_LOGIN, error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
}

function validatePassword(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    throw new Error(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
  }
  if (password.length < 8) {
    throw new Error(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error(ERROR_MESSAGES.PASSWORD_NO_UPPERCASE);
  }
  if (!/[a-z]/.test(password)) {
    throw new Error(ERROR_MESSAGES.PASSWORD_NO_LOWERCASE);
  }
  if (!/[0-9]/.test(password)) {
    throw new Error(ERROR_MESSAGES.PASSWORD_NO_NUMBER);
  }
  if (!/[!@#$%^&*]/.test(password)) {
    throw new Error(ERROR_MESSAGES.PASSWORD_NO_SPECIAL_CHAR);
  }
}