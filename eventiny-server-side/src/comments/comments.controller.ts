import {
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

export class InterfaceCommentDoc {
  @ApiProperty()
  comment: string;
}
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
    type: InterfaceCommentDoc,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'BAD REQUEST',
  })
  @ApiParam({
    name: 'user_id',
  })
  @ApiParam({
    name: 'event_id',
  })
  @Post('/:user_id/:event_id')
  addComment(
    @Param() ids: object,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.commentsService.addComment(ids, body);
  }
  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
    type: Object,
  })
  @ApiParam({
    name: 'id',
  })
  @Get(':event_id')
  getAllEventComment(@Param('event_id') id: number): Promise<Error | object> {
    return this.commentsService.getAllEventComment(id);
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'BAD REQUEST',
  })
  @Delete(':id')
  deleteComment(@Param() id: object): Promise<Error | string> {
    return this.commentsService.deleteComment(id);
  }
  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
    type: InterfaceCommentDoc,
  })
  @ApiParam({
    name: 'commentId',
  })
  @ApiParam({
    name: 'userId',
  })
  @ApiParam({
    name: 'eventId',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'BAD REQUEST',
  })
  @ApiBody({
    type: InterfaceCommentDoc,
  })
  @Put('/:commentId/:userId/:eventId')
  updateComment(
    @Body() body: object,
    @Param() ids: object,
  ): Promise<Error | string> {
    return this.commentsService.updateComment(ids, body);
  }
}
