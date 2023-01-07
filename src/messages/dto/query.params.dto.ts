import { Transform } from 'class-transformer';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { DateHelper } from 'src/common/helpers/date.helper';

export class QueryParamsDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => DateHelper(value))
  dateFilter?: string;

  @IsOptional()
  @IsBoolean()
  owner?: boolean;
}
