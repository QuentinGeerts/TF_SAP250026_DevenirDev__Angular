import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Authentication } from '../../../core/services/authentication';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  
  private readonly _authService: AuthService = inject(AuthService);

  isConnected!: boolean;
  
  ngOnInit(): void {
    this._authService.authentication$.subscribe({
      next: (value: boolean) => this.isConnected = value
    })
  }
}
