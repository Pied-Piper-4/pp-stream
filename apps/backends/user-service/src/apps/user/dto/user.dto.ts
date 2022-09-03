import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.model';

export class CreateUserNormal {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class LoginUserNormalDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class GoogleAuthDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  pic: string;
}

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @ApiProperty()
  bio?: string;

  @IsOptional()
  @ApiProperty()
  pic?: string;

  @IsOptional()
  @ApiProperty()
  phone?: string;
}

export class ActivateDeactivateUserDto {
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;
}
