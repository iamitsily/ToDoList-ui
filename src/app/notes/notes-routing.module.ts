import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListPageComponent } from './pages/note-list-page/note-list-page.component';
import { NoteDetailsPageComponent } from './pages/note-details-page/note-details-page.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RolGuard } from '../core/guards/roles.guard';
const routes: Routes = [
  {
    path: 'list', 
    component: NoteListPageComponent,
    canActivate: [AuthGuard, RolGuard],
    data: {expectedRoles: ['User','Admin']}
  },
  {
    path: 'details/:id',
    component: NoteDetailsPageComponent,
    canActivate: [AuthGuard, RolGuard],
    data: {expectedRoles: ['User','Admin']}
  },
  { 
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
