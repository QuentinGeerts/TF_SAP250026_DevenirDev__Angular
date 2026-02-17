import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private _isConnected: boolean = false;
  authentication$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isConnected);
  
  get status() {
    return this._isConnected;
  }

  login() {
    this._isConnected = true;
    this.authentication$.next(this._isConnected);
  }
  
  logout() {
    this._isConnected = false;
    this.authentication$.next(this._isConnected);
  }

}
