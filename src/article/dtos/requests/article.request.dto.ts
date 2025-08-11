import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ArticleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
