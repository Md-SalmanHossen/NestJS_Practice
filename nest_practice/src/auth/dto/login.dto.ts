import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please provide your email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required! Please provide Password' })
  @MinLength(6, { message: 'Password must be atleast 6 character long' })
  password: string;
}
