import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsString()
  @IsOptional()
  readonly selfIntro?: string;

  @IsString()
  @IsOptional()
  readonly profileImage?: string;
}
