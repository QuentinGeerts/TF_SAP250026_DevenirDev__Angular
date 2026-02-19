import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../../shared/models/todo.models';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodolistService {
  private readonly http: HttpClient = inject(HttpClient);
  
  getAllTodo(): HttpResourceRef<Todo[]> {
    return httpResource<Todo[]>(() => `${environment.apiUrl}/api/Todos`, { defaultValue: [] });
  }
  
  updateStatus(id: string, status: number): Observable<Todo> {
    console.log('status :>> ', status);
    return this.http.patch<Todo>(`${environment.apiUrl}/api/Todos/${id}/status`, { status });
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/Todos/${id}`)
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${environment.apiUrl}/api/Todos`, todo);
  }
}
