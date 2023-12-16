import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = this.usersRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async createUser(createUserDto: CreateUserDto) {
    const email = createUserDto.email
    const userExists = await this.usersRepository.findOne({
      where: { email },
    });
    if (userExists) {
      throw new ConflictException('Email is already Exists, Try with different EmailId');
    }
    const newUser = await this.usersRepository.create(createUserDto);
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    await this.usersRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return newUser;
  }

  async deleteById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return null;
    }

    await this.usersRepository.remove(user);
    return user;
  }
}
