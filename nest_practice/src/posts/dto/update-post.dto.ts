import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(80, { message: 'Title can not be more than 50 character' })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be string' })
  @MinLength(5, { message: 'Content must be 3 three character long' })
  content?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be string' })
  @MinLength(3, { message: 'Author must be at least 2 characters long' })
  @MaxLength(80, { message: 'Author can not be more than 25 character' })
  authorName?: string;
}
