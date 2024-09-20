import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      // Llama al servicio de login
      this.authService.login(this.email, this.password).subscribe(
        response => {
          if (response !=null) {
            this.authService.saveToken(response.token);
            this.authService.saveUser(response.user);
            this.router.navigate(['/notes']);
          }else{
            this.errorMessage = 'Inicio de sesión fallido. Por favor revise sus credenciales.';
          }
        },
        (error) => {
          this.errorMessage = 'Inicio de sesión fallido. Por favor revise sus credenciales.';
        }
      );
    }
  }
}
