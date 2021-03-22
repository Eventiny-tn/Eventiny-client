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
import { PlannerRequestController } from './planner-request/planner-request.controller';
import { PlannerRequestModule } from './planner-request/planner-request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    EventModule,
    CategoryModule,
    PlannerRequestModule,
  ],
  controllers: [AppController, PlannerRequestController],
  providers: [AppService],
})
export class AppModule {}
