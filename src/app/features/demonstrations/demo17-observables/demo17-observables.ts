import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-demo17-observables',
  imports: [],
  templateUrl: './demo17-observables.html',
  styleUrl: './demo17-observables.css',
})
export class Demo17Observables implements OnInit {
  
  private readonly _authService: AuthService = inject(AuthService);
  
  isConnected!: boolean;
  
  ngOnInit(): void {
    this._authService.authentication$.subscribe({
      next: (value: boolean) => { this.isConnected = value; }
    });
  }

  login() {
    this._authService.login();
  }
  logout() {
    this._authService.logout();
  }

}
