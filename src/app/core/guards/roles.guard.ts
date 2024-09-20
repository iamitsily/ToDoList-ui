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

    const hasRole = expectedRoles.some((role: string) => userRoles.includes(role));

    if (!hasRole) {
      this.router.navigate(['/user/unauthorized']);
      return false;
    }
    return true;
  }
}