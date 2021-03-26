import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Participant } from './participant.entity';
import { EventModule } from 'src/event/event.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant]), EventModule],
  controllers: [ParticipantController],
  providers: [ParticipantService, Repository, UserService, Connection],
  exports: [],
})
export class ParticipantModule {}
