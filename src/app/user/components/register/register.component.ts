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
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
    errorMessage: string | undefined;
    registerForm: FormGroup;

    constructor(private userService: UserAPIService, private router: Router, private fb: FormBuilder) {
      this.registerForm = this.fb.group({
        email: [this.email, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        name: [this.name, Validators.required]
      });
    }

    register(){
      if (this.email && this.password && this.name) {
        this.userService.register(this.email, this.password, this.name, 1).subscribe(
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
