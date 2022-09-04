import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateStreamDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isPrivate: boolean;
}

export class UpdateMeetingDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isPrivate: boolean;

  @IsOptional()
  @IsString()
  key: string;
}
