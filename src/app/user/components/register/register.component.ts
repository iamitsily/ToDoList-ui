import { Component } from '@angular/core';
import { UserAPIService } from '../../../core/services/user-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    errorMessage: string | undefined;
    registerForm: FormGroup;

    constructor(private userService: UserAPIService, private router: Router, private fb: FormBuilder) {
      this.registerForm = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        password: ['', Validators.required],
        name: ['', Validators.required]
      });
    }

    register(){
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const name = this.registerForm.get('name')?.value;
      if (email && password && name) {
        this.userService.register(email, password, name, 1).subscribe(
          response => {
            if (response !=null){
              this.router.navigate(['/user']);
            }else{
              this.errorMessage = 'Registro fallido. Por favor revise sus credenciales.';
            }
          }
        );
      }
    }
}
