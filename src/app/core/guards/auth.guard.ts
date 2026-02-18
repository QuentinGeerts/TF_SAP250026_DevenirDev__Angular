import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FakeAuthenticationService } from '../services/fake-authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(FakeAuthenticationService).status()
    ? true
    : inject(Router).navigate(["demonstrations", "demo12"]);
};
