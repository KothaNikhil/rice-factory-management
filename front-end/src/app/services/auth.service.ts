import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  isAuthenticated(): boolean {
    return this.cookieService.check('authToken');
  }
}
