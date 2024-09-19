import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Task {
  id: number;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'pending';
}

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {
  tasks: Task[] = [
    {
      id: 1,
      date: '2023-05-15',
      title: 'Completar informe',
      description: 'Finalizar el informe trimestral para la reunión del equipo',
      status: 'pending'
    },
    {
      id: 2,
      date: '2023-05-16',
      title: 'Llamada con cliente',
      description: 'Realizar llamada de seguimiento con el cliente principal',
      status: 'completed'
    },
    {
      id: 3,
      date: '2023-05-17',
      title: 'Actualizar sitio web',
      description: 'Implementar nuevas características en la página de inicio',
      status: 'pending'
    },
  ];
  isModalOpen = false; // Controla la visibilidad del modal
  newTask: Task = {id: 0, title: '', description: '', date: '', status: 'pending' };
  editingTaskIndex: number | null = null; // Controla si estamos editando (almacena el índice de la tarea)
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      status: ['pending', Validators.required]
    });
  }

  openModal() {
    this.isModalOpen = true;
  }
  editTask(index: number) {
    this.editingTaskIndex = index; // Almacena el índice de la tarea que se va a editar
    this.taskForm.patchValue(this.tasks[index]); // Llena el formulario con los datos de la tarea
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }
  saveTask() {
    if (this.taskForm.valid) { // Verifica si el formulario es válido
      if (this.editingTaskIndex !== null) {
        this.tasks[this.editingTaskIndex] = { ...this.taskForm.value, id: this.tasks[this.editingTaskIndex].id };
        // Elimina esta línea: this.editingTaskIndex = null; 
      } else {
        const newTask: Task = { ...this.taskForm.value, id: this.tasks.length + 1 };
        this.tasks.push(newTask);
      }
      this.closeModal();
    }
  }
  
  resetForm() {
    this.taskForm.reset({ status: 'pending' }); // Resetea el formulario a su estado inicial
    this.editingTaskIndex = null; // Resetea el índice de edición
  }
}
