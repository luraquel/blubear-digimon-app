import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

// Reemplaza 'path/to/your/authentication.service' con la ruta real de tu AuthenticationService

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    take(1),
    map((user) => {
      if (user && user.emailVerified) {
        return true;
      } else {
        return router.createUrlTree(['/login']); // No autenticado, redirigir a login
      }
    }),
  );
};
