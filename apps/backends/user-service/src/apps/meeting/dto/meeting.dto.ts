import { IsOptional, IsString } from 'class-validator';

export class CreateStreamDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateMeetingDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
