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
    await this.connection.manager.save(comments);
    return 'progress';
  }
  async getAllEventComment(id: number): Promise<Error | object> {
    const comments = await this.commentRepository.find({
      relations: ['event', 'commentator'],
    });
    let allRelatedComment = [];
    await comments.map((element) => {
      if (element.event.id == id) {
        allRelatedComment.push(element);
      }
    });
    return allRelatedComment;
  }
}
