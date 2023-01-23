import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsString()
  selfIntro?: string;

  @IsString()
  profileImage?: string;
}
