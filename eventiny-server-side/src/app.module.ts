import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { EventssModule } from './events/eventss.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, EventssModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
