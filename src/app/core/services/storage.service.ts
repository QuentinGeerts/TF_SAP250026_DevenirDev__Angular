import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  // -- LocalStorage
  
  setLocal<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocal<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

  // -- SessionStorage

  setSession<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSession<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearSession(): void {
    sessionStorage.clear();
  }

  // -- LocalStorage

  clearLocal(): void {
    localStorage.clear();
  }

}
