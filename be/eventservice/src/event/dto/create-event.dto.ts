import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
  IsUUID,
} from 'class-validator';

export class HosterDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}

export class ParticioantsDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsString()
  data: any;
}

export class AnnouncementDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly announcementId: string;

  @IsString()
  data: any;
}

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  readonly hoster: HosterDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  readonly participants: ParticioantsDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  readonly announcements: AnnouncementDto;
}
