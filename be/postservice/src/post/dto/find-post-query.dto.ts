import { IsOptional, IsPositive, IsString } from 'class-validator';

export class FindPostQuery {
  @IsOptional()
  @IsString()
  readonly ownerId: string;

  @IsOptional()
  @IsString()
  readonly eventId: string;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsPositive()
  readonly offset: number;
}
