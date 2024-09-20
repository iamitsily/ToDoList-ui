import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfleComponent } from './components/profle/profle.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { unauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfleComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    unauthorizedPageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class UserModule { }
