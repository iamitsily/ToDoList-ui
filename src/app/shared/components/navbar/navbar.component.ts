import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userName: string | undefined;
  isAuthenticated: boolean = false;
  isMenuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      const user = this.authService.getUser();
      this.authService.currentUser.subscribe((user) => {
        this.userName = user.name;
      });
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/user';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
