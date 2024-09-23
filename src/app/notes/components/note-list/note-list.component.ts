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
  newTask: Note = { id: 0, title: '', description: '', date: '', state: 0, activeTodo: 1, userId: 0 }; // Inicializa la nueva tarea
  editingTaskIndex: number | null = null; // Controla si estamos editando (almacena el índice de la tarea)
  taskForm: FormGroup;

  constructor(private fb: FormBuilder,  private notesApi: NotesApiService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      activeTodo: [1, Validators.required],
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
      const taskData: Note = { ...this.taskForm.value };
  
      if (this.editingTaskIndex !== null && this.editingTaskIndex >= 0) { 
        // Verifica que editingTaskIndex no sea null y sea un índice válido
        const updatedTask = {
          ...this.tasks[this.editingTaskIndex], 
          ...taskData // Sobrescribe los datos con el formulario
        };
  
        this.notesApi.updateNote(updatedTask).subscribe(
          (updatedNote: Note) => {
            this.tasks[this.editingTaskIndex!] = updatedNote; // Actualiza la tarea en el array local
            this.closeModal();
          },
          error => {
            console.error('Error al actualizar la tarea:', error);
          }
        );
      } else {
        // Agregando una nueva tarea
        this.notesApi.addNote(taskData).subscribe(
          (newNote: Note) => {
            this.tasks.push(newNote); // Agrega la nueva tarea a la lista
            this.closeModal();
          },
          error => {
            console.error('Error al agregar la nueva tarea:', error);
          }
        );
      }
    }
  }
    
  deleteTask() {
    if (this.editingTaskIndex !== null && this.editingTaskIndex >= 0) {
      const taskId = this.tasks[this.editingTaskIndex].id;
      this.notesApi.deleteNote(taskId).subscribe(
        () => {
          this.tasks.splice(this.editingTaskIndex!, 1); // Elimina la tarea de la lista
          this.closeModal(); // Cierra el modal después de eliminar la tarea
          this.editingTaskIndex = null; // Resetea el índice de edición
        },
        error => {
          console.error('Error al eliminar la tarea:', error);
        }
      );
    }
  }
  
  resetForm() {
    this.taskForm.reset({ state: 0 }); // Resetea el formulario a su estado inicial
    this.editingTaskIndex = null; // Resetea el índice de edición
  }
}
