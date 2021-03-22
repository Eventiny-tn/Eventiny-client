import { Repository } from 'typeorm';
import { UserService } from './user/user.service';
import { GoogleStrategy } from 'src/auth/google-strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    EventModule,
    CategoryModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, UserService],
})
export class AppModule {}
