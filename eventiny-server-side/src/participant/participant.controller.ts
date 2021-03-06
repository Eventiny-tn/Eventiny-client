import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParticipantService } from './participant.service';
@ApiTags('participant')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}
  @Post('ticket/:user_id/:event_id')
  buyTicket(
    @Param('user_id') user_id: number,
    @Param('event_id') event_id: number,
    @Body() body: object,
  ): Promise<Error | object> {
    return this.participantService.buyTicket(user_id, event_id, body);
  }
  @Get('/:user_id/:event_id')
  getParticipant(
    @Param('event_id') event_id: number,
    @Param('user_id') user_id: number,
  ): Promise<Error | Object> {
    return this.participantService.getParticipant(event_id, user_id);
  }
  @Get('/:event_id')
  getAllParticipant(
    @Param('event_id') event_id: number,
  ): Promise<Error | Object> {
    return this.participantService.getAllParticipant(event_id);
  }
  
  @Post('payment')
  Pay(@Body() payMeth: Object): Promise<Error | Object> {
    return this.participantService.Pay(payMeth);
  }
}
