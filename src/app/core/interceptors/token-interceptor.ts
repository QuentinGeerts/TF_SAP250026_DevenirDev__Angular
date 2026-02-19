import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(AuthService).connectedUser()?.token;

  if (!token) return next(req);
  
  const secured = req.clone({ setHeaders: { Authorization: `bearer ${token}` } });
  return next(secured);
};
