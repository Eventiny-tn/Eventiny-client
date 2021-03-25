import { Event } from 'src/event/event.entity';
import { Connection, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private connection: Connection,
  ) {}
  async addComment(ids, body): Promise<Error | string> {
    const comments = new Comment(body.comment);
    comments.commentator = ids.user_id;
    comments.event = ids.event_id;
    console.log(comments);
    await this.connection.manager.save(comments);
    return 'progress';
  }
  async getAllEventComment(id: object): Promise<Error | object> {
    const comments = await this.commentRepository.find({
      relations: ['event', 'commentator'],
    });
    return comments;
  }
}
