import { Component, ViewChild } from '@angular/core';
import { UserAPIService } from '../../../core/services/user-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    @ViewChild(AlertComponent) alertComponent!: AlertComponent;

    errorMessage: string | undefined;
    registerForm: FormGroup;
    isSubmitting = false;

    constructor(private userService: UserAPIService, private router: Router, private fb: FormBuilder) {
      this.registerForm = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        name: ['', [Validators.required, Validators.minLength(3)]]
      });
    }

    register(){
      this.alertComponent.showAlert('Espere por favor', 'alert-info');
      if (this.registerForm.invalid) {
        return;
      }
      this.isSubmitting = true;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const name = this.registerForm.get('name')?.value;
      if (email && password && name) {
        this.userService.register(email, password, name, 1).subscribe(
          response => {
            if (response !=null){
              this.alertComponent.close();
              this.router.navigate(['/user']);
            }else{
              this.alertComponent.close();
              this.isSubmitting = false;
              this.errorMessage = 'Registro fallido. Por favor revise sus credenciales.';
            }
          },
          error => {
            this.alertComponent.close();
            this.isSubmitting = false;
            if (error.status === 409) {
              this.errorMessage = 'El correo electrónico ya está registrado.';
            } else {
              this.errorMessage = 'Error en el registro. Por favor intente de nuevo.';
            }
          }
        );
      }
    }
}
