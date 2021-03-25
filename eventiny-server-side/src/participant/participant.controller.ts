// import { Controller, Param, Post } from '@nestjs/common';
// import { ParticipantService } from './participant.service';

// @Controller('participant')
// export class ParticipantController {
//   constructor(private readonly participantService: ParticipantService) {}
//   @Post()
//   buyTicket(
//     @Param('user_id') user_id: number,
//     @Param('event_id') event_id: number,
//   ): Promise<Error | object> {
//     return this.participantService.buyTicket(user_id, event_id);
//   }
// }
