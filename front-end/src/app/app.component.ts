import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'rice-factory-management';
  // isAuthenticated = false;

  constructor(public authService: AuthService) {
    // this.isAuthenticated = this.authService.isAuthenticated();
  }
}
