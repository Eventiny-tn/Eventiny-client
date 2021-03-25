import { Controller, Param, Post, Body, Get } from '@nestjs/common';
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
  getAllEventComment(@Param() id: object): Promise<Error | object> {
    return this.commentsService.getAllEventComment(id);
  }
}
