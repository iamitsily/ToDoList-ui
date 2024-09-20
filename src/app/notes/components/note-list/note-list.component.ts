import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesApiService } from '../../../core/services/notes-api.service';
import { Note } from '../../../core/model/note';
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
  tasks: Note[]= [];
  isModalOpen = false; // Controla la visibilidad del modal
  newTask: Note = { id: 0, title: '', description: '', date: '', state: 0, active: 1, userId: 0 }; // Inicializa la nueva tarea
  editingTaskIndex: number | null = null; // Controla si estamos editando (almacena el índice de la tarea)
  taskForm: FormGroup;

  constructor(private fb: FormBuilder,  private notesApi: NotesApiService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      state: [0, Validators.required] // Ajusta según tu modelo
    });
  }

  ngOnInit() {
    this.loadTasks(); // Carga las tareas al iniciar el componente
  }

  loadTasks() {
    this.notesApi.getNotes().subscribe(
      (tasks: Note[]) => {
        this.tasks = tasks; // Asigna las tareas obtenidas al array de tareas
      },
      error => {
        console.error('Error al cargar las tareas:', error);
      }
    );
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
      } else {
        const newTask: Note = { ...this.taskForm.value, id: this.tasks.length + 1 }; // Ajusta la generación de ID según tu API
        this.tasks.push(newTask);
      }
      this.closeModal();
    }
  }
  
  resetForm() {
    this.taskForm.reset({ state: 0 }); // Resetea el formulario a su estado inicial
    this.editingTaskIndex = null; // Resetea el índice de edición
  }
}
