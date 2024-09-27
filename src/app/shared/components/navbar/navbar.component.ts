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
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse a cambios en el estado del usuario
    this.authService.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user; // Si hay un usuario, está autenticado
      if (this.isAuthenticated) {
        this.userName = user.name; // Actualizar el nombre del usuario
      } else {
        this.userName = ''; // Resetear el nombre si no hay usuario
      }
    });
  }

  userDemo(){
    this.isSubmitting = true;
    const email = "userdemo@example.com";
    const password = "userdemo";
    if (email && password) {
      // Llama al servicio de login
      this.authService.login(email, password).subscribe(
        response => {
          if (response !=null) {
            this.authService.saveToken(response.token);
            this.authService.updateUserLocal(response.user);
            this.isSubmitting = false;
            this.router.navigate(['/notes']);
          }else{
          }
        },
        (error) => {
          this.isSubmitting = false;
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
