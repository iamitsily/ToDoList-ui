import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.email && this.password) {
      // Llama al servicio de login
      this.authService.login(this.email, this.password).subscribe(
        response => {
          if (response !=null) {
            this.authService.saveToken(response.token);
            this.authService.updateUserLocal(response.user);
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
