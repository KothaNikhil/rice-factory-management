import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { API_ENDPOINTS, CONSTANTS } from 'src/app/constants/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirmAuthService {

  constructor(private http: HttpClient, public cookieService: CookieService, private router: Router) { }

  login(firm: any) {
    const url = API_ENDPOINTS.LOGIN;
    return this.http.post(CONSTANTS.API_URL + url, firm);
  }

  register(firm: any) {
    const url = API_ENDPOINTS.REGISTER;
    return this.http.post(CONSTANTS.API_URL + url, firm);
  }

  update(firm: any) {
    const url = API_ENDPOINTS.UPDATE;
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(CONSTANTS.API_URL + url, firm, { headers });
  }

  getFirm() {
    const url = API_ENDPOINTS.GET_FIRM;
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(CONSTANTS.API_URL + url, { headers });
  }

  logout() {
    const url = API_ENDPOINTS.LOGOUT;
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(CONSTANTS.API_URL + url, {}, { headers });
  }

  logoutAndNavigate() {
    this.logout().subscribe(() => {
      this.cookieService.delete('authToken');
      this.router.navigate(['/login']);
    });
  }
}
