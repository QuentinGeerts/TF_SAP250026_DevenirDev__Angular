import { Component, computed, inject } from '@angular/core';
import { AuthLogin } from "./auth-login/auth-login";
import { AuthSignup } from "./auth-signup/auth-signup";
import { AuthService } from '../../../core/services/auth.service';
import { Todolist } from "./todolist/todolist";

export type UserChoice = 'login' | 'signup' | 'logout' | '';

@Component({
  selector: 'app-demo21-interceptor',
  imports: [AuthLogin, AuthSignup, Todolist],
  templateUrl: './demo21-interceptor.html',
  styleUrl: './demo21-interceptor.css',
})
export class Demo21Interceptor {

  private readonly auth: AuthService = inject(AuthService);

  isConnected = computed(() => this.auth.connectedUser());
  userChoice: UserChoice = 'login';

  logout() {
    this.auth.logout();
  }

}
