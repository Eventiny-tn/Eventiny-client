import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Userinfo, UserLog } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    private jwtService: JwtService,

  ) {}
  async signup(user: Userinfo): Promise<string | Error> {
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
    return 'done';
  }

  async login(body: UserLog): Promise<object | Error | string> {
    console.log(body);
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

}
