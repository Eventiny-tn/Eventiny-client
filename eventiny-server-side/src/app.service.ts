import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
import { ticket } from '../template/ticket.js';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  async googleLogin(req, res): Promise<any> {
    if (!req.user) {
      return 'No user from google';
    } else {
      let access_token = await this.jwtService.sign({
        username: req.user.email,
      });
      const user = await this.userRepository.findOne({ email: req.user.email });
      if (user) {
        console.log('im here');

        return {
          user: req.user,
          token: access_token,
        };
      }
      console.log('im out');
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.user.email, salt);
      const data = await this.userRepository.save({
        firstname: req.user.firstname,
        username: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        userimg: req.user.userimg,
        password: hash,
      });
      return {
        user: data,
        token: access_token,
      };
    }
  }
  public email(user): void {
    this.mailerService
      .sendMail({
        to: user, // List of receivers email address
        from: 'eventiny.tn@gmail.com', // Senders email address
        subject: 'Event Planner Deman ✔', // Subject line
        text: 'welcome', // plaintext body
        template: 'index', // HTML body content
        context: {
          // Data to be sent to template engine.
          username: 'Eventiny TN',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  public sendTicket({ data }): void {
    console.log('----------------------------', data);
    const template = ticket(data);
    console.log(template);
    this.mailerService
      .sendMail({
        to: data.userEmail, // List of receivers email address
        from: 'eventiny.tn@gmail.com', // Senders email address
        subject: 'Ticket ✔', // Subject line
        text: 'welcome', // plaintext body
        html: template, // HTML body content
        context: {
          // Data to be sent to template engine.
          username: 'Eventiny TN',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
