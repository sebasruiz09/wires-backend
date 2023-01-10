import { Transform } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { DateHelper } from 'src/common/helpers/date.helper';

export class FindMessageDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => DateHelper(value))
  date?: string;

  @IsOptional()
  user?: string;
}
