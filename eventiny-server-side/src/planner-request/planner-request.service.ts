import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlannerRequest } from './planner-request.entity';

@Injectable()
export class PlannerRequestService {
  constructor(
    @InjectRepository(PlannerRequest)
    private PlannerRepository: Repository<PlannerRequest>,
  ) {}
  async saveFormPremium(body): Promise<Error | string> {
    console.log('ala', body);
    if (body) {
      await this.PlannerRepository.save(body);
      return 'done';
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
}
