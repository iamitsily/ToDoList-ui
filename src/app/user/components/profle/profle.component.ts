import { Component, OnInit } from '@angular/core';
import { UserAPIService } from '../../../core/services/user-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profle',
  templateUrl: './profle.component.html',
  styleUrl: './profle.component.css'
})
export class ProfleComponent implements OnInit{
    userEmail: string | undefined;
    userName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    updateForm: FormGroup;
    isAuthenticated: boolean = false;

    constructor(private userAPIService: UserAPIService, private authService: AuthService, private fb: FormBuilder) {
      this.updateForm = this.fb.group({
        email: [this.email, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        name: [this.userName, [Validators.required, Validators.minLength(3)]],
        active: [1, Validators.required]
      });

    }

    ngOnInit(): void {
      this.isAuthenticated = this.authService.isAuthenticated();
      
      if (this.isAuthenticated) {
        const user = this.authService.getUser();
        this.userEmail = user.email;
        this.userName = user.name;
        this.updateForm.patchValue({
          email: this.userEmail,
          name: this.userName,
        });
      }
    }
    update() {
      if (this.updateForm.valid) {
        // Obtener los valores del formulario
        const formValues = this.updateForm.value;
    
        // Obtener el id del usuario (esto asume que tienes el id disponible en tu componente)
        const userId = this.authService.getUser().id;
    
        // Llamar al servicio para actualizar el usuario
        this.userAPIService.update(userId, formValues.email, formValues.password, formValues.name, formValues.active)
          .subscribe({
            next: (response) => {
              console.log('Usuario actualizado con éxito', response);
              this.authService.updateUserLocal(response);
              // Aquí puedes agregar lógica para mostrar un mensaje de éxito, redirigir, etc.
            },
            error: (error) => {
              console.error('Error al actualizar el usuario', error);
              // Aquí puedes manejar el error, como mostrar un mensaje al usuario.
            }
          });
      } else {
        console.log('Formulario no válido');
      }
    }
    
}
