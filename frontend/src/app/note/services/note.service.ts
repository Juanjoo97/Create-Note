import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Note } from '../interfaces/note.interface';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environment/environment';
@Injectable({providedIn: 'root'})
export class NoteService {
  private baseUrl: string =environments.baseUrl
  constructor(private httpClient: HttpClient,private router: Router) {
   }

   guardarNota(nota: { title: string, content: string }): Observable<any> {
    const url = `${this.baseUrl}/notes`;
    return this.httpClient.post(url, nota);
  }
   getNotes():Observable<Note[]>{
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
    const url = `${this.baseUrl}/archived/archived/${id}`;
    return this.httpClient.post(url, { responseType: 'text' });
  }
  unarchivarNota(id: number): Observable<any> {
    const url = `${this.baseUrl}/archived/unarchived/${id}`;
    return this.httpClient.post(url, { responseType: 'text' });
  }

  verArchivados() {
    this.router.navigate(['/archived']);
  }
}
