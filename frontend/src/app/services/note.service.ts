import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../interfaces/note.interface';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
@Injectable({ providedIn: 'root' })
export class NoteService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  guardarNota(nota: { title: string, content: string }): Observable<any> {
    const url = `${this.baseUrl}/notes`;
    return this.httpClient.post(url, nota);
  }

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>((`${this.baseUrl}/notes`));
  }

  eliminarNota(id: number): Observable<any> {
    const url = `${this.baseUrl}/notes/${id}`;
    return this.httpClient.delete(url);
  }

  actualizarNota(id: number, nota: { title: string, content: string }): Observable<any> {
    const url = `${this.baseUrl}/notes/${id}`;
    return this.httpClient.put(url, nota);
  }

  archivarNota(id: number): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/notes/${id}/archive`, {});
  }

  unarchivarNota(id: number): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/notes/${id}/unarchive`, {});
  }

}
