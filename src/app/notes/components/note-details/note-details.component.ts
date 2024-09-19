import { Component } from '@angular/core';

interface Task {
  id: number;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'pending';
}

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent {
  task: Task = {
    id: 1,
    date: '2023-05-15',
    title: 'Completar informe',
    description: 'Finalizar el informe trimestral para la reunión del equipo',
    status: 'pending'
  };
  isEditing = false;
  editedTask: Task = { ...this.task };

  handleEdit(): void {
    this.isEditing = true;
    this.editedTask = { ...this.task };
  }

  handleSave(): void {
    this.task = { ...this.editedTask };
    this.isEditing = false;
  }
}
