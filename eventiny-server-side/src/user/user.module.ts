import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './constants';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '10s' },
  })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
