import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  readonly ownerId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly eventId: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString({ each: true })
  readonly images: string[];
}
