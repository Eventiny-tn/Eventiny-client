import { Module } from '@nestjs/common';
import { PlannerRequestService } from './planner-request.service';
import { PlannerRequestController } from './planner-request.controller';
import { PlannerRequest } from './planner-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlannerRequest])],
  controllers: [PlannerRequestController],
  providers: [PlannerRequestService],
})
export class PlannerRequestModule {}
