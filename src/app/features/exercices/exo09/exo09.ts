import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ageValidator } from '../../../shared/validators/age.validator';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-exo09',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './exo09.html',
  styleUrl: './exo09.css',
})
export class Exo09 {

  private readonly _fb: FormBuilder = inject(FormBuilder);

  form: FormGroup = this._fb.group({
    birthDate: [null, [Validators.required, ageValidator()]]
  });

  onSubmit() {
    console.log("Soumission du formulaire...");
  }
}
