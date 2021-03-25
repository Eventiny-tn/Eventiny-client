import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comments } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
  ) {}
  async addComment(ids, body): Promise<Error | string> {
    const comment = Object.assign(ids, body);
    console.log(comment);
    await this.commentRepository.save(comment);
    return 'progress';
  }
  async getAllEventComment(id: object): Promise<Error | object> {
    const comments = await this.commentRepository.find(id);
    
    return comments;
  }
}
