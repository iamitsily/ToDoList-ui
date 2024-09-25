import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userName: string | undefined;
  isAuthenticated: boolean = false;
  isMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      const user = this.authService.getUser();
      this.authService.currentUser.subscribe((user) => {
        this.userName = user.name;
      });
    }
  }

  userDemo(){
    const email = "userdemo@example.com";
    const password = "userdemo";
    if (email && password) {
      // Llama al servicio de login
      this.authService.login(email, password).subscribe(
        response => {
          if (response !=null) {
            this.authService.saveToken(response.token);
            this.authService.updateUserLocal(response.user);
            this.router.navigate(['/notes']);
          }else{
          }
        },
        (error) => {
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
