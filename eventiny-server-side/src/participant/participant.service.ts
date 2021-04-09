import { Injectable, HttpService, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/event/event.entity';
import { Participant } from './participant.entity';
import { EROFS } from 'node:constants';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly http: HttpService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private connection: Connection,
  ) {}

  async buyTicket(user_id, event_id, body): Promise<Error | Object> {
    try {
      const participants = await this.connection
        .getRepository(Participant)
        .createQueryBuilder('participant') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .leftJoinAndSelect('participant.event', 'event')
        .leftJoinAndSelect('participant.user', 'user')
        .where(`participant.event =${event_id}`)
        .andWhere(`participant.user =${user_id}`)
        .getOne();
      if (!participants) {
        console.log('Creating reservation ...');
        let participant = await new Participant(body.quantity);
        participant.user = user_id;
        participant.event = event_id;
        await this.connection.manager.save(participant);
        return { message: 'done' };
      } else {
        console.log('Updating reservation ...');
        let newQuantity =
          (await (participants.quantity * 1)) + body.quantity * 1;
        await this.connection
          .getRepository(Participant)
          .createQueryBuilder('participant') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
          .where(`id = ${participants.id} `)
          .update(Participant)
          .set({ quantity: newQuantity })
          .execute();
      }
    } catch (error) {
      console.log(error);
      return new error(error);
    }
  }

  async getParticipant(event_id, user_id): Promise<Error | Object> {
    try {
      const participant = await this.connection
        .getRepository(Participant)
        .createQueryBuilder('participant') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .leftJoinAndSelect('participant.event', 'event')
        .leftJoinAndSelect('participant.user', 'user')
        .where(`participant.event =${event_id}`)
        .andWhere(`participant.user =${user_id}`)
        .getMany();
      return participant;
    } catch (err) {
      return new Error(err);
    }
  }

  async getAllParticipant(event_id): Promise<Error | Object> {
    try {
      const participant = await this.connection
        .getRepository(Participant)
        .createQueryBuilder('participant') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .leftJoinAndSelect('participant.event', 'event')
        .where(`participant.event =${event_id}`)
        .getMany();
      return participant;
    } catch (err) {
      return new Error(err);
    }
  }

  async Pay(payMeth): Promise<Error | Object> {
    console.log('haythem', payMeth);

    try {
      payMeth.receiverWallet = process.env.Eventiny_Wallet;
      payMeth.selectedPaymentMethod = 'gateway';
      payMeth.token = 'TND';
      payMeth.orderId = '2458715';
      payMeth.webhook = 'merchant.tech/api/notification_payment';
      payMeth.successUrl = 'success@merchant.tech';
      payMeth.failUrl = 'fail@merchant.tech';
      const response = await this.http
        .post(
          'https://api.preprod.konnect.network/api/v1/payments/init-payment',
          payMeth,
        )
        .toPromise();
      console.log(payMeth);
      console.log('URL==>', response.data);
      return response.data;
    } catch (error) {
      return new UnauthorizedException('Payment failed');
    }
  }
}
