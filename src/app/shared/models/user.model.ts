export interface User {
  email: string;
  lastname: string;
  firstname: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface UserWithId extends User {
  id: number;
}