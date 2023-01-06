import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsString()
  @Length(0, 300)
  content: string;

  @IsString()
  userId: string;
}
