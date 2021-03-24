import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';

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
        email: req.user.email,
        secret: 'Liiim',
      });
      const data = await this.userRepository.save({
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        userimg: req.user.userimg,
      });
      console.log({ token: access_token, data: data });

      return {
        message: 'User information from google',
        user: req.user,
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
        html: 'index', // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
