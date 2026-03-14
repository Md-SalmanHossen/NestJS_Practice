import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide your email' })
  email: string;

  @IsNotEmpty({ message: 'Name is required! Please provide your name' })
  @IsString({ message: 'Name must be string' })
  @MinLength(3, { message: 'Name must be atlease 3 character long' })
  @MaxLength(50, { message: 'Name can not longer than 50 characters' })
  name: string;

  @IsNotEmpty({ message: 'Password is required! Please provide Password' })
  @MinLength(6, { message: 'Password must be atleast 6 character long' })
  password: string;
}
