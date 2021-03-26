import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/event/event.entity';
import { Participant } from './participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private connection: Connection,
  ) {}
  async buyTicket(user_id, event_id, body): Promise<Error | Object> {
    console.log('=>', user_id, event_id, body);

    try {
      if (body) {
        let participant = await new Participant(body.quantity);
        participant.user = user_id;
        participant.event = event_id;
        await this.connection.manager.save(participant);
        return { message: 'done' };
      }
    } catch (error) {
      return new error();
    }
  }
}
