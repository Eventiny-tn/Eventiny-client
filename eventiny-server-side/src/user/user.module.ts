import { AppService } from './../app.service';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { GoogleStrategy } from 'src/auth/google-strategy';
import { EventModule } from 'src/event/event.module';
import { ParticipantModule } from 'src/participant/participant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '25h' },
    }),
    EventModule,
    // ParticipantModule,
    UserModule,
  ],
  controllers: [UserController],
  providers: [UserService, GoogleStrategy, AppService],
  exports: [UserService, JwtModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
