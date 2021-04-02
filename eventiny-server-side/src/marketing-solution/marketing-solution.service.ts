import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketingSolution } from './marketing-solution.entity';

@Injectable()
export class MarketingSolutionService {
  constructor(
    @InjectRepository(MarketingSolution)
    private MarketingRepository: Repository<MarketingSolution>,
  ) {}
  async saveFacebookinfo(body): Promise<Error | string> {
    console.log('fbinfo', body);
    if (body) {
      await this.MarketingRepository.save(body);
      return 'done';
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
}
