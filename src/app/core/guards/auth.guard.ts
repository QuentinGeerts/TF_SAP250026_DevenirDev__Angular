import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from '../services/authentication';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(Authentication).status()
    ? true
    : inject(Router).navigate(["demonstrations", "demo12"]);
};
