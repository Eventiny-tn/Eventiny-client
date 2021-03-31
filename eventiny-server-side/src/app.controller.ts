import { Body, Post, Res, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  response: any;
  constructor(
    private readonly appService: AppService, // private readonly userRepo: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req, @Res() res) {
    this.response = res;
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { token } = await this.appService.googleLogin(req, res);
    res.redirect('http://localhost:8080/' + token);
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
