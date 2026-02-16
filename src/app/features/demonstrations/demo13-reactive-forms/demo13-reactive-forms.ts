import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLinkActive } from "@angular/router";
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-demo13-reactive-forms',
  imports: [ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './demo13-reactive-forms.html',
  styleUrl: './demo13-reactive-forms.css',
})
export class Demo13ReactiveForms {

  // 1.  FormControl
  email = new FormControl<string>('quentin.geerts@bstorm.be', [Validators.email]);


  // 2.  FormGroup
  catFormGroup: FormGroup = new FormGroup({
    catName: new FormControl(null, [Validators.required]),
    catNbPaws: new FormControl(4, []),
    catOwnerEmail: new FormControl(null, []),
    catMainColor: new FormControl(null, [Validators.required])
  });

  onSubmitCatForm() {
    if (this.catFormGroup.invalid) {
      // Code ...
      return;
    }

    console.log('catFormGroup.value :>> ', this.catFormGroup.value);
  }


  // 3.  FormBuilder

  private readonly _fb: FormBuilder = inject(FormBuilder);

  // userForm1: FormGroup = this._fb.nonNullable.group({}); // Tout le groupement est non nullable
  userForm1: FormGroup = this._fb.group({
    lastname: [null, []],
    firstname: [null, []],

    address: this._fb.group({
      street: [null, []],
      number: [null, []],
      zip: [null, []],
      city: [null, []]
    })
  });


  // 4.  FormArray + message d'erreur

  profileForm: FormGroup = this._fb.group({
    email: [null, [Validators.email]],
    lastname: ["Anonyme", [Validators.minLength(2)]],
    firstname: [null, []],
    spokenLanguages: this._fb.array([
      this._fb.control(null, [])
    ]),
    passwords: this._fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, []]
    }, {
      validators: [passwordMatchValidator()],
      asyncValidators: []
    })
  });

  get spokenLanguages(): FormArray {
    return this.profileForm.get("spokenLanguages") as FormArray;
  }

  addLanguageField() {
    this.spokenLanguages.push(this._fb.control(null, [Validators.required]));
  }

  removeLanguageField(index: number) {
    if (this.spokenLanguages.length === 1) return;
    this.spokenLanguages.removeAt(index);
  }

  onReset() {
    this.profileForm.reset();
  }

  onResetDefault() {
    this.profileForm.reset({
      lastname: 'Anonyme'
    });
  }

  onPartialFill() {
    const response = {
      "email": "quentin.geerts@bstorm.be",
      "lastname": "Geerts",
      "firstname": "Quentin"
    }

    // Remplis partiellement les champs
    this.profileForm.patchValue(response);
  }

  onFill() {
    const response = {
      "email": "quentin.geerts@bstorm.be",
      "lastname": "Geerts",
      "firstname": "Quentin",
      "spokenLanguages": [
        "Anglais",
        "Français",
        "Néerlandais"
      ],
      "passwords": {
        "password": "Test1234=",
        "confirmPassword": "Test1234="
      }
    };

    // Obligation de remplir TOUS les champs
    this.profileForm.setValue(response);
  }
}

