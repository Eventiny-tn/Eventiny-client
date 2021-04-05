import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { MarketingSolutionService } from './marketing-solution.service';

@ApiTags('marketingsolution')
@Controller('marketingsolution')
export class MarketingSolutionController {
  constructor(
    private readonly marketingSolutionService: MarketingSolutionService,
  ) {}
  @Post()
  saveFacebookinfo(@Body() body): Promise<Error | string> {
    return this.marketingSolutionService.saveFacebookinfo(body);
  }
}
