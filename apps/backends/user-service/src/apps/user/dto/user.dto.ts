import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../user.model';

export class CreateUserNormal {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginUserNormalDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class GoogleAuthDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  pic: string;
}

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  bio?: string;

  @IsOptional()
  pic?: string;

  @IsOptional()
  phone?: string;
}

export class ActivateDeactivateUserDto {
  @IsBoolean()
  isActive: boolean;
}
