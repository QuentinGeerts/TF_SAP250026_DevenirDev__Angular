export interface User {
  email: string;
  lastname: string;
  firstname: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignUp {
  email: string;
  password: string;
  lastname?: string;
  firstname?: string;
}

export interface UserWithId extends User {
  id: number;
}