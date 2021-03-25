import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Userinfo, UserLog } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    private jwtService: JwtService,
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
}
