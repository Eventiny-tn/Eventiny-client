import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getConnection, Repository } from 'typeorm';
import { User, Userinfo, UserLog } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { Event } from '../event/event.entity';
@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private connection: Connection,
    private email: AppService,
  ) {}
  async signup(user: Userinfo): Promise<object | Error> {
    const username = await this.userRepository.findOne({
      username: user.username,
    });
    const email = await this.userRepository.findOne({ email: user.email });
    if (username || email) {
      console.log('here same username');
      return new NotFoundException('NOT FOUND');
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    this.userRepository.save(user);

    let access_token = this.jwtService.sign({
      username: user.email,
      secret: 'Liiim',
    });
    return { user: user, token: access_token };
  }

  async login(body: UserLog): Promise<object | Error | string> {
    const logger = await this.userRepository.findOne({ email: body.email });

    if (logger) {
      const islogged = bcrypt.compareSync(body.password, logger.password);
      if (islogged) {
        let access_token = this.jwtService.sign({
          username: body.email,
          password: body.password,
        });
        if (logger.isBanned) {
          return { auth: false, state: false, token: access_token };
        }
        return { auth: true, token: access_token };
      }
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }

  async getinfo(header): Promise<object | Error | string> {
    console.log('service ===>', header);

    // if (header) {
    const token = header.split(' ')[1];
    let access_token = this.jwtService.verify(token, { secret: 'Liiim' });
    const info = await this.userRepository.findOne({
      email: access_token.username,
    });
    console.log(info);
    if (info) {
      return info;
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }

  async verifyUser(token): Promise<Error | boolean | object> {
    try {
      const tokeN = await token.authorization.split(' ')[1];
      const verify = await this.jwtService.verify(tokeN, { secret: 'Liiim' });
      const user = await this.userRepository.findOne({
        email: verify.username,
      });
      return user;
    } catch (err) {
      return new NotFoundException('NOT FOUND');
    }
  }

  async updateInfo(id, body): Promise<Error | string> {
    console.log(body);

    if (id && body) {
      await this.userRepository.update(id, body);
      return 'done';
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    } else {
      const data = await this.userRepository.save({
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        userimg: req.user.userimg,
      });
      return data;
    }
  }
  async buyTicket(user_id, event_id): Promise<Error | any> {
    try {
      return await getConnection()
        .createQueryBuilder()
        .insert()
        .into('participant')
        .values([{ event_id, user_id }])
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
  async getplanner(req): Promise<object | Error> {
    console.log(req);
    const info = await this.userRepository.find({});
    console.log(info);
    if (info) {
      return info;
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }

  async updatetoPlanner(id, body): Promise<Error | string> {
    console.log(body);

    if (id && body) {
      await this.userRepository.update(id, body);
      return 'done';
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
  async upgradePlannerDemande(id): Promise<Error | string> {
    if (id) {
      await this.userRepository.update(id.id, { plannerDemand: true });
      const { email } = await this.userRepository.findOne(id);
      await this.email.email(email);
      return 'upgraded';
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
  async uploadPic(id, body): Promise<Error | string> {
    console.log('user id ', id, 'body', body);

    const userimg = body.image;
    await this.userRepository.query(
      `UPDATE user SET userimg = '${userimg}' where id = ${id.id}; `,
    );
    return 'uploaded';
  }
  async getEventPlanner(req): Promise<Error | object> {
    try {
      const eventPlanners = await this.userRepository.find({
        plannerDemand: true,
      });
      return eventPlanners;
    } catch (err) {
      return new NotFoundException('NOT FOUND');
    }
  }

  async updateUserPassword(id, body): Promise<Error | string> {
    try {
      console.log(id, body);
      const user = await this.userRepository.findOne({ id: id.id });
      const check = bcrypt.compareSync(body.currentPass, user.password);
      console.log('===<>', check);

      if (check) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(body.password, salt);
        await this.userRepository.query(
          `update user set password='${hash}' where id=${id.id};`,
        );
        return 'ok';
      } else {
        return new NotFoundException('WRONG PASSWORD');
      }
    } catch (err) {
      return new NotFoundException('WRONG PASSWORD');
    }
  }
}
