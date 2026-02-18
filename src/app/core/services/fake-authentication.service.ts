import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthenticationService {

  private isConnected = signal(true);

  get status() {
    return this.isConnected;
  }

  login() {
    this.isConnected.set(true);
  }

  logout() {
    this.isConnected.set(false);
  }

}
