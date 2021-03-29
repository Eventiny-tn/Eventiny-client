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

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post('/:user_id/:event_id')
  addComment(
    @Param() ids: object,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.commentsService.addComment(ids, body);
  }
  @Get(':event_id')
  getAllEventComment(@Param('event_id') id: number): Promise<Error | object> {
    return this.commentsService.getAllEventComment(id);
  }
  @Delete(':id')
  deleteComment(@Param() id: object): Promise<Error | string> {
    return this.commentsService.deleteComment(id);
  }
  @Put('/:commentId/:userId/:eventId')
  updateComment(
    @Body() body: object,
    @Param() ids: object,
  ): Promise<Error | string> {
    return this.commentsService.updateComment(ids, body);
  }
}
