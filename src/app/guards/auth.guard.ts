import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(AuthService).isLoggedIn;
  const router = inject(Router);
  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/', 'auth', 'login']);
    return false;
  }
};
