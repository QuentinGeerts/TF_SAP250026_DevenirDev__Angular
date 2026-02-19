import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { TodolistService } from '../../../../core/services/todolist.service';
import { HttpResourceRef } from '@angular/common/http';
import { Todo } from '../../../../shared/models/todo.models';
import { FormsModule } from '@angular/forms';
import { Modal, Toast } from 'bootstrap';
import { TodolistAdd } from "../todolist-add/todolist-add";
import { DatePipe } from '@angular/common';

const STATUS_LABELS = ['Pas commencé', 'En cours', 'Terminé'];

@Component({
  selector: 'app-todolist',
  imports: [FormsModule, TodolistAdd, DatePipe],
  templateUrl: './todolist.html',
  styleUrl: './todolist.css',
})
export class Todolist {
  private readonly todoService: TodolistService = inject(TodolistService);

  todos: HttpResourceRef<Todo[]> = this.todoService.getAllTodo();

  @ViewChild('toastEl') toastEl!: ElementRef;
  @ViewChild('modalEl') modalEl!: ElementRef;
  @ViewChild(TodolistAdd) todolistAddComp!: TodolistAdd;
  toastTodoName = signal('');
  toastMessage = signal('');

  private modal!: Modal;

  openModal() {
    this.modal = new Modal(this.modalEl.nativeElement);
    this.modal.show();
  }

  updateStatus(todo: Todo, status: Event) {
    const newStatus = (status.target as HTMLSelectElement).value;
    this.todoService.updateStatus(todo.id, +newStatus)
      .subscribe({
        next: (t: Todo) => {
          this.toastTodoName.set(`✅ ${t.title}`)
          this.toastMessage.set(`${STATUS_LABELS[todo.status]} → ${STATUS_LABELS[t.status]}`);
          new Toast(this.toastEl.nativeElement).show();
          this.todos.reload();
        },
        error: (err) => {
          this.toastTodoName.set(`❌ Erreur`)
          this.toastMessage.set(`${err.message}`);
          new Toast(this.toastEl.nativeElement).show();
        }
      });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe({
      next: () => {
        this.toastTodoName.set(`✅ ${todo.title}`)
        this.toastMessage.set(`A bien été supprimée`);
        new Toast(this.toastEl.nativeElement).show();
        this.todos.reload();
      },
      error: (err) => {
        this.toastTodoName.set(`❌ Erreur`)
        this.toastMessage.set(`${err.message}`);
        new Toast(this.toastEl.nativeElement).show();
      }
    })
  }

  createTodo(todo: Todo | null) {
    if (!todo) return;
    this.todoService.createTodo(todo).subscribe({
      next: (created: Todo) => {
        this.modal.hide();
        this.toastTodoName.set(`✅ ${created.title}`)
        this.toastMessage.set(`A bien été créé`);
        new Toast(this.toastEl.nativeElement).show();
        this.todos.reload();
      },
      error: (err) => {
        this.toastTodoName.set(`❌ Erreur`)
        this.toastMessage.set(`${err.message}`);
        new Toast(this.toastEl.nativeElement).show();
      }
    });
  }
}
