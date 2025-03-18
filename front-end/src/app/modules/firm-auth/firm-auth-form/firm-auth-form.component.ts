import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { FirmAuthService } from '../services/firm-auth.service';
import { ERROR_MESSAGES, MESSAGES } from '../../../constants/constants';
import { AuthService } from 'src/app/services/auth.service';

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
  errorMessage: string = '';

  constructor(private firmAuthService: FirmAuthService, private router: Router, private authService: AuthService) { 
    console.log('FirmAuthFormComponent created');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      let currentUrl = event.url;
      console.log('Current URL:', currentUrl);
      switch (currentUrl) {
        case '/register':
          this.formMode = FirmAuthFormMode.Register;
          break;
        case '/profileUpdate':
          this.formMode = FirmAuthFormMode.Update;
          this.preFillForm();
          break;
        case '/login':
        default:
          if (this.authService.isAuthenticated()) {
            this.router.navigate(['/transactions']);
          } else {
            this.formMode = FirmAuthFormMode.Login;
          }
          break;
      }
    });
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

    this.firmAuthService.update(this.firm).subscribe({
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

    this.firmAuthService.register(this.firm).subscribe({
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
    this.firmAuthService.login(this.firm).subscribe({
      next: (response: any) => {
        this.firmAuthService.cookieService.set('authToken', response.token, { path: '/', secure: true, sameSite: 'Strict' });
        this.router.navigate(['/transactions']);
      },
      error: error => {
        if (error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred during login';
        }
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
  
  private preFillForm() {
    this.firmAuthService.getFirm().subscribe({
      next: (firmDetails: any) => {
        this.firm.name = firmDetails.name;
        this.firm.email = firmDetails.email;
        this.firm.phone = firmDetails.phone;
      },
      error: error => {
        console.error(ERROR_MESSAGES.ERROR_FETCHING_FIRM_DETAILS, error);
      },
      complete: () => {
        console.log('Firm details fetched successfully');
      }
    });
  }
}

function validatePassword(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    throw new Error(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
  }
}
