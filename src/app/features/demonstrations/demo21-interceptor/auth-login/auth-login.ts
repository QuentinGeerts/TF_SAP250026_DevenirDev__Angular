import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { TokenInfo } from '../../../../shared/models/jwt.model';

@Component({
  selector: 'app-auth-login',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.css',
})
export class AuthLogin {

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);

  errorResponse: WritableSignal<boolean | null> = signal(null);
  errorMessage: WritableSignal<string | null> = signal(null);

  displayPassword: WritableSignal<boolean> = signal(false);

  loginForm: FormGroup = this.fb.group({
    email: ["quentin.geerts@bstorm.be", [Validators.required, Validators.email]],
    password: ["Test1234=", [Validators.required]]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    
    console.log('this.loginForm.value :>> ', this.loginForm.value);
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.errorResponse.set(false);
          this.errorMessage.set("Inscription réussie");
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
