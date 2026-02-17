import { ResolveFn } from '@angular/router';
import { User, UserWithId } from '../../shared/models/user.model';

export const userResolver: ResolveFn<UserWithId | null> = (route, state) => {

  const users: UserWithId[] = [
    { id: 1, email: 'quentin.geerts@bstorm.be', lastname: 'Geerts', firstname: 'Quentin' },
    { id: 2, email: 'john.doe@scoobydoo.be', lastname: 'Doe', firstname: 'John' },
  ]

  const id = +route.params["id"];

  if (!users.some(u => u.id === id)) return null;

  return users.find(u => u.id === id)!;
};
