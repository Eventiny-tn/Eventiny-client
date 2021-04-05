import { CategoryType } from './category.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
export class AddCategoryInterface {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
}

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
    type: AddCategoryInterface,
  })
  @ApiUnauthorizedResponse({
    description: 'Bad request',
    status: 403,
  })
  @ApiBody({
    type: AddCategoryInterface,
  })
  @Post()
  addCategory(@Body() body: CategoryType): Promise<Error | string> {
    return this.categoryService.addCategory(body);
  }
  @ApiCreatedResponse({
    status: 200,
    description: 'Array of categories',
    type: AddCategoryInterface,
  })
  @Get()
  getAllCategory(@Req() req): Promise<Error | object> {
    return this.categoryService.getAllCategory(req);
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
    type: String,
  })
  @ApiParam({
    name: 'id',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Bad Request',
  })
  @Put(':id')
  updateByid(
    @Param() id: number,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.categoryService.updateByid(id, body);
  }
  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
    type: String,
  })
  @ApiParam({
    name: 'id',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Bad Request',
  })
  @Delete(':id')
  deleteOneById(@Param() id: number): Promise<Error | string> {
    return this.categoryService.deleteOneById(id);
  }
}
