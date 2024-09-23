import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Note } from '../model/note';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class NotesApiService {
  private apiUrl = Config.apiUrl+'/api/todos'

  constructor(private http: HttpClient, private authService:AuthService) { }


  private getHeaders() {
    const token = this.authService.getToken();
    if (!token) {
        throw new Error('Token no encontrado');
    }
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    });
}

   // Listar todas las notas
   getNotes(): Observable<Note[]> {
    const idUser = this.authService.getUser().id;
    return this.http.get<Note[]>(`${this.apiUrl}/findByUser/${idUser}`, { headers: this.getHeaders() });
  }

  // Guardar una nueva nota
  addNote(note: Note): Observable<Note> {
    const requestBody = {
      ...note,
      user : {id: this.authService.getUser().id}
    };
    return this.http.post<Note>(`${this.apiUrl}/register`, requestBody, { headers: this.getHeaders() });
  }

  // Editar una nota existente
  updateNote(note: Note): Observable<Note> {
    const requestBody = {
      ...note
    }
    return this.http.put<Note>(`${this.apiUrl}/update`, requestBody, { headers: this.getHeaders() });
  }

  // Eliminar una nota
  deleteNote(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteById/${noteId}`, { headers: this.getHeaders() });
  }
}
