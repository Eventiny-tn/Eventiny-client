import { Module } from '@nestjs/common';
import { MarketingSolutionService } from './marketing-solution.service';
import { MarketingSolutionController } from './marketing-solution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketingSolution } from './marketing-solution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketingSolution])],
  controllers: [MarketingSolutionController],
  providers: [MarketingSolutionService],
  exports: [MarketingSolutionService]
})
export class MarketingSolutionModule {}
