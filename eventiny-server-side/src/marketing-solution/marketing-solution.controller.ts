import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketingSolutionService } from './marketing-solution.service';
import { CreateMarketingSolutionDto } from './dto/create-marketing-solution.dto';
import { UpdateMarketingSolutionDto } from './dto/update-marketing-solution.dto';

@Controller('marketing-solution')
export class MarketingSolutionController {
  constructor(private readonly marketingSolutionService: MarketingSolutionService) {}

  @Post()
  create(@Body() createMarketingSolutionDto: CreateMarketingSolutionDto) {
    return this.marketingSolutionService.create(createMarketingSolutionDto);
  }

  @Get()
  findAll() {
    return this.marketingSolutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketingSolutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketingSolutionDto: UpdateMarketingSolutionDto) {
    return this.marketingSolutionService.update(+id, updateMarketingSolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketingSolutionService.remove(+id);
  }
}
