import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';
import { AuthService } from '../../../../core/services/auth.service';
import { UserSignUp } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-auth-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-signup.html',
  styleUrl: './auth-signup.css',
})
export class AuthSignup {

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);

  displayPassword: WritableSignal<boolean> = signal(false);
  errorResponse: WritableSignal<boolean | null> = signal(null);
  errorMessage: WritableSignal<string | null> = signal(null);

  signupForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, []]
    }, {
      validators: [passwordMatchValidator()]
    }),
    lastname: [null, []],
    firstname: [null, []],
  });

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const userSignup: UserSignUp = {
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('passwords.password')?.value,
      lastname: this.signupForm.get('lastname')?.value !== "" ? this.signupForm.get('lastname')?.value : null,
      firstname: this.signupForm.get('firstname')?.value !== "" ? this.signupForm.get('firstname')?.value : null,
    };

    this.authService.signup(userSignup)
      .subscribe({
        next: () => {
          this.errorResponse.set(false);
        },
        error: (err) => {
          this.errorResponse.set(true);
          this.errorMessage.set(err.error.message ? err.error.message : err.error.errors?.Password[0]);
        }
      });
  }

  onChange(): void {
    this.displayPassword.update(old => !old);
  }
}
