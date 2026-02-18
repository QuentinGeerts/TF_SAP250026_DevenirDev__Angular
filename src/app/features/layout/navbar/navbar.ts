import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FakeAuthenticationService } from '../../../core/services/fake-authentication.service';
import { FakeAuthService } from '../../../core/services/fake-auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  
  private readonly _authService: FakeAuthService = inject(FakeAuthService);

  isConnected!: boolean;
  
  ngOnInit(): void {
    this._authService.authentication$.subscribe({
      next: (value: boolean) => this.isConnected = value
    })
  }
}
