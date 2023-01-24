import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly userName?: string;

  @IsString()
  @IsOptional()
  readonly selfIntro?: string;

  @IsString()
  @IsOptional()
  readonly profileImage?: string;
}
