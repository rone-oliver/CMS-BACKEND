export interface CreateUserInput {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export interface UserPublic {
  id: string;
  fullname: string;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserForAuth = UserPublic & { passwordHash: string };
