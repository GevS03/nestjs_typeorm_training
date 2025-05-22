import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PostDto } from 'src/users/dtos/Post.dto';
import { ProfileDto } from 'src/users/dtos/Profile.dto';
import { UserDto } from 'src/users/dtos/User.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.updateUser(id, userDto);

      return res.status(201).json({ message: 'The user successfuly updated' });
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Cannot update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    try {
      await this.userService.deleteUser(id);
      return res.status(200).json({ message: 'The user successfuly deleted' });
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Cannot delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileDto: ProfileDto,
  ) {
    return this.userService.createUserProfile(id, profileDto);
  }

  @Post(':id/posts')
  createPost(@Param('id', ParseIntPipe) id: number, @Body() postDto: PostDto) {
    return this.userService.createPost(id, postDto);
  }
}
