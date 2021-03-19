// import { CategoryController } from './category.controller';
// import { Module } from '@nestjs/common';
// import { CategoryService } from './category.service';
// import { Category } from './category.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [TypeOrmModule.forFeature([Category])],
//   controllers: [CategoryController],
//   providers: [CategoryService],
//   exports: [TypeOrmModule],
// })
// export class CategoryModule {}
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule, CategoryService],
})
export class CategoryModule {}
