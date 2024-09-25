import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
  })

export class RolGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const expectedRoles = route.data.expectedRoles;
    const userRoles = this.authService.getUserRoles();

    // Si los roles esperados incluyen 'Demo', no se bloquea el acceso
    if (expectedRoles.includes('Demo')) {
      return true;
    }

    // Verifica si el usuario tiene el rol 'Demo' y lo bloquea si no es permitido
    if (userRoles.includes('Demo')) {
      this.router.navigate(['/user/unauthorized']);
      return false;
    }

    const hasRole = expectedRoles.some((role: string) => userRoles.includes(role));

    if (!hasRole) {
      this.router.navigate(['/user/unauthorized']);
      return false;
    }

    return true;
  }
}