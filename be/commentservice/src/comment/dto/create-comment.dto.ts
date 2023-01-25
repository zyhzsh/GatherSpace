import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}

export class CreateCommentDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly postId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  readonly commenter: UserDto;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
