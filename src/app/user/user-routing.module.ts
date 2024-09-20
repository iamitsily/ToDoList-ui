import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RolGuard } from '../core/guards/roles.guard';
import { unauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { 
    path: 'register', 
    component: RegisterPageComponent
  },
  { 
    path: 'profile', 
    component: ProfilePageComponent,
    canActivate: [AuthGuard, RolGuard],
    data: {expectedRoles: ['User','Admin']}
  },
  { path: 'unauthorized', component: unauthorizedPageComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
