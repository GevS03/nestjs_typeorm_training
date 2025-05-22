import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './trypeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './trypeorm/entities/Profile';
import { Post } from './trypeorm/entities/Post';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser4',
      password: 'testuser789',
      database: 'nestjs_mysql_test',
      entities: [User, Profile, Post],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
