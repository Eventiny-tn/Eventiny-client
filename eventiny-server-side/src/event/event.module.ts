import { ImagesModule } from './../images/images.module';

import { CategoryModule } from './../category/category.module';
import { Event } from './event.entity';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), CategoryModule, ImagesModule],
  providers: [EventService],
  controllers: [EventController],
  exports: [TypeOrmModule],
})
export class EventModule {}
