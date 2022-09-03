import { User } from './user.model';

export interface UserSignupResponse {
  message?: string;
  user?: User;
  token?: string;
  isCreated?: boolean;
  status?: string;
}

export type LoginUserResponse = UserSignupResponse;
