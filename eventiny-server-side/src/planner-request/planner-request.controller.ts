import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlannerRequestService } from './planner-request.service';

@ApiTags('plannerRequest')
@Controller('plannerRequest')
export class PlannerRequestController {
  constructor(private readonly plannerRequestService: PlannerRequestService) {}
  @Post()
  saveFormPremium(@Body() body): Promise<Error | string> {
    return this.plannerRequestService.saveFormPremium(body);
  }
}
