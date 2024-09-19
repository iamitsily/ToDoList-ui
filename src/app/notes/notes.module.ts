import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'

import { AdminRoutingModule } from './notes-routing.module';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteDetailsComponent } from './components/note-details/note-details.component';
import { NoteListPageComponent } from './pages/note-list-page/note-list-page.component';
import { NoteDetailsPageComponent } from './pages/note-details-page/note-details-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

@NgModule({
  declarations: [
    NoteListComponent,
    NoteDetailsComponent,
    NoteListPageComponent,
    NoteDetailsPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class notesModule { }
