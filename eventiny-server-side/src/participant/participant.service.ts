// import { Injectable } from '@nestjs/common';
// import { User } from 'src/user/user.entity';
// import { Connection, Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Event } from 'src/event/event.entity';

// @Injectable()
// export class ParticipantService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//     private eventRepository: Repository<Event>,
//     private connection: Connection,
//   ) {}
//   async buyTicket(user_id, event_id): Promise<Error | object> {
//     console.log('user: ', user_id);
//     console.log('event: ', event_id);

//     return { 'who cares': 1 };
//   }
// }
