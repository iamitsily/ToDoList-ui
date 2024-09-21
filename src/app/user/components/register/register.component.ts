import { Component } from '@angular/core';
import { UserAPIService } from '../../../core/services/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    email: string = '';
    password: string = '';
    name: string = '';
    errorMessage: string = '';
    constructor(private userService: UserAPIService, private router: Router) {}

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
