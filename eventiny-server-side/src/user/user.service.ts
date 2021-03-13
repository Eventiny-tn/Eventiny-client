import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Userinfo, UserLog } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async signup(user: Userinfo): Promise<string | Error> {
    const username = await this.userRepository.findOne({
      username: user.username,
    });
    const email = await this.userRepository.findOne({ email: user.email });
    console.log(username);

    if (username || email) {
      return new NotFoundException('NOT FOUND');
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    this.userRepository.save(user);
    return 'done';
  }
  async login(body: UserLog): Promise<string | Error> {
    console.log(body);
    const logger = await this.userRepository.findOne({ email: body.email });

    if (logger) {
      const islogged = bcrypt.compareSync(body.password, logger.password);
      if (islogged) {
        return 'success';
      }
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
}
