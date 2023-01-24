import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class FindEventQuery {
  @IsNotEmpty()
  @IsOptional()
  readonly hosterId: string;

  @IsNotEmpty()
  @IsOptional()
  readonly participantId: string;

  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @IsPositive()
  readonly offset: number;
}
