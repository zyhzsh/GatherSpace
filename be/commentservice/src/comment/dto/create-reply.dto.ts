import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UserDto } from './create-comment.dto';

export class CreateReplyDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly commentId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  readonly commenter: UserDto;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
