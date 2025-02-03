import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService); // Inject your AuthService
  const isAuthenticated = authService.isAuthenticated(); // Use your AuthService to check authentication

  if (!isAuthenticated) {
    router.navigate(['/firm-auth']);
    return false;
  }

  return true;
};
