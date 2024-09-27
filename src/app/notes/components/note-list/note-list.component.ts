import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesApiService } from '../../../core/services/notes-api.service';
import { Note } from '../../../core/model/note';
import { AuthService } from '../../../core/services/auth.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';

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
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;
  isSubmitting = false;

  tasks: Note[] = [];
  isModalOpen = false; // Controla la visibilidad del modal
  newTask: Note = {
    id: 0,
    title: '',
    description: '',
    date: '',
    state: 0,
    activeTodo: 1,
    userId: 0,
  }; // Inicializa la nueva tarea
  editingTaskIndex: number | null = null; // Controla si estamos editando (almacena el índice de la tarea)
  taskForm: FormGroup;
  isDemoUser: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private notesApi: NotesApiService,
    private authService: AuthService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      activeTodo: [1, Validators.required],
      state: [0, Validators.required], // Ajusta según tu modelo
    });
  }

  ngOnInit() {
    this.loadTasks(); // Carga las tareas al iniciar el componente
    this.checkUserRole();
  }

  loadTasks() {
    this.notesApi.getNotes().subscribe(
      (tasks: Note[]) => {
        this.tasks = tasks; // Asigna las tareas obtenidas al array de tareas
      },
      (error) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  checkUserRole() {
    const userRoles = this.authService.getUserRoles(); // Obtiene los roles del usuario
    this.isDemoUser = userRoles.includes('Demo'); // Establece isDemoUser si el rol 'Demo' está presente
  }

  openModal() {
    this.isSubmitting = false;
    this.isModalOpen = true;
    this.editingTaskIndex = null;
    this.taskForm.reset({
      title: '',
      description: '',
      date: '',
      state: 0,
      activeTodo: 1,
    });
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    this.taskForm.patchValue({
      date: today,
    });
  }
  editTask(index: number) {
    this.editingTaskIndex = index;
    const task = this.tasks[index];

    // Asegúrate de resetear el formulario antes de actualizarlo
    this.taskForm.reset({
      title: task.title,
      description: task.description,
      date: task.date,
      state: task.state,
      activeTodo: 1,
    });

    // Marca los campos del formulario como tocados para que la validación funcione correctamente
    this.taskForm.markAllAsTouched();

    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  saveTask() {
    // Mensaje de carga inicial
    this.isSubmitting = true;
  
    if (this.taskForm.valid) {
      const taskData: Note = { ...this.taskForm.value };
  
      const userRoles = this.authService.getUserRoles(); 
  
      if (this.editingTaskIndex !== null && this.editingTaskIndex >= 0) {
        const updatedTask = {
          ...this.tasks[this.editingTaskIndex],
          ...taskData,
        };
  
        if (userRoles.includes('Demo')) {
          this.tasks[this.editingTaskIndex!] = updatedTask;
          this.alertComponent.showAlert('Tarea actualizada localmente.', 'alert-success', 5000);
          this.isSubmitting = false;
          this.closeModal();
        } else {
          this.notesApi.updateNote(updatedTask).subscribe(
            (updatedNote: Note) => {
              this.tasks[this.editingTaskIndex!] = updatedNote;
              this.alertComponent.showAlert('Tarea actualizada exitosamente.', 'alert-success', 5000);
              this.isSubmitting = false;
              this.closeModal();
            },
            (error) => {
              this.alertComponent.showAlert('Error al actualizar la tarea', 'alert-warning', 5000);
              this.isSubmitting = false;
            }
          );
        }
      } else {
        if (userRoles.includes('Demo')) {
          taskData.id = this.tasks.length + 1; 
          this.tasks.push(taskData);
          this.alertComponent.showAlert('Tarea agregada localmente.', 'alert-success', 5000);
          this.isSubmitting = false;
          this.closeModal();
        } else {
          this.notesApi.addNote(taskData).subscribe(
            (newNote: Note) => {
              this.tasks.push(newNote);
              this.alertComponent.showAlert('Tarea agregada exitosamente.', 'alert-success', 5000);
              this.isSubmitting = false;
              this.closeModal();
            },
            (error) => {
              this.alertComponent.showAlert('Error al agregar la nueva tarea', 'alert-warning', 5000);
              this.isSubmitting = false;
            }
          );
        }
      }
    } else {
      
    }
  }
  
  deleteTask() {
    this.alertComponent.showAlert('Eliminando tarea...', 'alert-info', 0);
    this.isSubmitting = true; // Se activa al iniciar la eliminación
  
    if (this.editingTaskIndex !== null && this.editingTaskIndex >= 0) {
      const userRoles = this.authService.getUserRoles();
  
      if (userRoles.includes('Demo')) {
        this.tasks.splice(this.editingTaskIndex!, 1); // Elimina la tarea de la lista
        this.alertComponent.showAlert('Tarea eliminada localmente.', 'alert-success', 5000);
        this.isSubmitting = false; // Restablecer aquí
        this.closeModal(); // Cerrar el modal
      } else {
        const taskId = this.tasks[this.editingTaskIndex].id;
        this.notesApi.deleteNote(taskId).subscribe(
          () => {
            this.tasks.splice(this.editingTaskIndex!, 1); // Elimina la tarea de la lista
            this.alertComponent.showAlert('Tarea eliminada exitosamente.', 'alert-success', 5000);
            this.isSubmitting = false; // Asegúrate de restablecer aquí
            this.closeModal(); // Cerrar el modal
            this.editingTaskIndex = null; // Resetea el índice de edición
          },
          (error) => {
            this.alertComponent.showAlert('No se pudo eliminar la tarea', 'alert-warning', 5000);
            this.isSubmitting = false; // Asegúrate de restablecer aquí también
          }
        );
      }
    }
  }
  
  

  resetForm() {
    this.taskForm.reset({
      title: '',
      description: '',
      date: '',
      state: 0,
      activeTodo: 1,
    });
    this.editingTaskIndex = null; // Resetea el índice de edición
  }
}
