import { CanDeactivateFn } from '@angular/router';

export const confirmGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return confirm("Es-tu sûr de vouloir partir ?");
};
