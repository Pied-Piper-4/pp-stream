import { IsEmail, IsString } from 'class-validator';

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
