import { Body, Post, Res, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  response: any;
  constructor(
    private readonly appService: AppService, // private readonly userRepo: UserService,
  ) {}
  @ApiTags('googleoauth')
  @ApiCreatedResponse({
    status: 200,
    description: 'Google OAuth Success',
    type: String,
  })
  @ApiUnauthorizedResponse({ description: 'USER DOES NOT EXIST IN GOOGLE' })
  @Get()
  @UseGuards(AuthGuard('google'))
  googleAuth(@Req() req, @Res() res) {
    this.response = res;
  }
  @ApiTags('googleoauth')
  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { token } = await this.appService.googleLogin(req, res);
    res.redirect('http://localhost:8080/' + token);
  }
  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
  })
  @ApiUnauthorizedResponse({ description: 'NOT FOUND' })
  @Get('email')
  email(user): any {
    return this.appService.email(user);
  }
  @ApiCreatedResponse({
    status: 201,
    description: 'Success',
  })
  @ApiUnauthorizedResponse({ description: 'NOT FOUND' })
  @ApiBody({
    type: Object,
  })
  @Post('send/ticket')
  sendTicket(@Body() ticketData): void {
    return this.appService.sendTicket(ticketData);
  }
}
