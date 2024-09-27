import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;
  errorMessage: string | undefined;
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.logout();
  }

  onSubmit() {
    this.alertComponent.showAlert('Espere por favor', 'alert-info');
    if (this.loginForm.invalid) {
      return; // Si el formulario es inválido, no se procede
    }
    this.isSubmitting = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (email && password) {
      // Llama al servicio de login
      this.authService.login(email, password).subscribe(
        response => {
          if (response !=null) {
            this.authService.saveToken(response.token);
            this.authService.updateUserLocal(response.user);
            this.alertComponent.close();
            this.router.navigate(['/notes']);
          }else{
            this.alertComponent.close();
            this.isSubmitting = false;
 
          }
        },
        (error) => {
          this.alertComponent.close();
          this.errorMessage = 'Inicio de sesión fallido. Por favor revise sus credenciales.';
          this.isSubmitting = false;
        }
      );
    }
  }
}
