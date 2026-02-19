import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User, UserLogin, UserSignUp } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';
import { JwtPayload, TokenInfo } from '../../shared/models/jwt.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  
  connectedUser = signal<JwtPayload | null>(null);
  
  login(login: UserLogin): Observable<TokenInfo> {
    return this.http.post<TokenInfo>(`${environment.apiUrl}/api/auth/login`, login)
    .pipe(
      tap((token: TokenInfo) => this.decodeToken(token))
    );
  }
  
  private decodeToken(token: TokenInfo): void {
    const claims = jwtDecode<JwtPayload>(token.token);
    
    this.connectedUser.set({
      token: token.token,
      sub: claims.sub,
      email: claims.email,
      role: claims.role,
      exp: claims.exp
    });
  }
  
  signup(signup: UserSignUp): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/auth/register`, signup);
  }

  logout() {
    this.connectedUser.set(null);
  }
}
