import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../../../../shared/models/todo.models';

@Component({
  selector: 'app-todolist-add',
  imports: [ReactiveFormsModule],
  templateUrl: './todolist-add.html',
  styleUrl: './todolist-add.css',
})
export class TodolistAdd {

  private readonly fb: FormBuilder = inject(FormBuilder);

  todoSignal: OutputEmitterRef<Todo | null> = output<Todo | null>();

  todoForm: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    description: [null, []],
  });

  onSubmit() {
    console.log("Soumission");
    if (this.todoForm.invalid) return;

    this.todoSignal.emit(this.todoForm.value);
  }

}
