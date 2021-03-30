import { Body, Post, Res, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly userRepo: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.appService.googleLogin(req, res);
  }
  @Get('email')
  email(user): any {
    return this.appService.email(user);
  }
  @Post('send/ticket')
  sendTicket(@Body() ticketData): any {
    return this.appService.sendTicket(ticketData);
  }
}
