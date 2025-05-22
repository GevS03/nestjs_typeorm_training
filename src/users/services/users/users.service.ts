import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/trypeorm/entities/Post';
import { Profile } from 'src/trypeorm/entities/Profile';
import { User } from 'src/trypeorm/entities/User';
import { PostParams, ProfileParams, UserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['profile', 'posts'] });
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

  async createUserProfile(id: number, profileDetails: ProfileParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create(profileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;

    return await this.userRepository.save(user);
  }

  async createPost(id: number, postParams: PostParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newPost = this.postRepository.create({ ...postParams, user });

    return this.postRepository.save(newPost);
  }
}
