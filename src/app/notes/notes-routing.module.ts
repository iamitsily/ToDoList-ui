import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListPageComponent } from './pages/note-list-page/note-list-page.component';
import { NoteDetailsPageComponent } from './pages/note-details-page/note-details-page.component';
const routes: Routes = [
  {
    path: 'list', 
    component: NoteListPageComponent
  },
  {
    path: 'details/:id',
    component: NoteDetailsPageComponent
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
