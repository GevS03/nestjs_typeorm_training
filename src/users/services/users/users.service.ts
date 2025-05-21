import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/trypeorm/entities/User';
import { UserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(userDetails: UserParams): Promise<User> {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdDate: new Date(),
    });

    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, userDetails: UserParams) {
    await this.userRepository.update({ id }, { ...userDetails });
  }

  async deleteUser(id: number) {
    await this.userRepository.delete({ id });
  }
}
