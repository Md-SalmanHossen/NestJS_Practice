import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entities';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {

    const {email,password,name}=registerDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use!');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      role: UserRole.USER,
    });

    const savedUser = await this.userRepository.save(newUser);
    const {password: _,...result}=savedUser;
    
    return {
      user: result,
      message: 'Registration successful! Login to continue',
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
