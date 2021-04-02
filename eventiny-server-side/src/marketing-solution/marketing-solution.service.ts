import { Injectable } from '@nestjs/common';
import { CreateMarketingSolutionDto } from './dto/create-marketing-solution.dto';
import { UpdateMarketingSolutionDto } from './dto/update-marketing-solution.dto';

@Injectable()
export class MarketingSolutionService {
  create(createMarketingSolutionDto: CreateMarketingSolutionDto) {
    return 'This action adds a new marketingSolution';
  }

  findAll() {
    return `This action returns all marketingSolution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marketingSolution`;
  }

  update(id: number, updateMarketingSolutionDto: UpdateMarketingSolutionDto) {
    return `This action updates a #${id} marketingSolution`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketingSolution`;
  }
}
