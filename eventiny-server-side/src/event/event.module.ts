// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { EventController } from './event.controller';
// import { Event } from './event.entity';
// import { EventService } from './event.service';

// @Module({
//   imports: [TypeOrmModule.forFeature([Event])],
//   controllers: [EventController],
//   providers: [EventService],
//   exports: [TypeOrmModule],
// })
// export class EventModule {}
import { CategoryModule } from './../category/category.module';
import { Event } from './event.entity';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), CategoryModule],
  providers: [EventService],
  controllers: [EventController],
  exports: [TypeOrmModule],
})
export class EventModule {}
