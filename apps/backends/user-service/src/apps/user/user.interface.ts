import { User } from './user.model';

export interface UserSignupResponse {
  message?: string;
  user?: User;
  token?: string;
  isCreated?: boolean;
}

export type LoginUserResponse = UserSignupResponse;
