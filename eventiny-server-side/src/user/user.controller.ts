import { Patch, Req, UseGuards } from '@nestjs/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Userinfo, UserLog } from './user.entity';
import { UserService } from './user.service';
@Controller()
export class UserController {
  constructor(private readonly userRepo: UserService) {}
  @Post('signup')
  signup(@Body() body: Userinfo): Promise<object | Error> {
    return this.userRepo.signup(body);
  }

  @Post('login')
  login(@Body() body: UserLog): Promise<object | string | Error> {
    return this.userRepo.login(body);
  }

  @Get('profile')
  getinfo(@Headers() header): Promise<object | string> {
    return this.userRepo.getinfo(header.authorisation);
  }

  @Put('updateinfo/:id')
  updateInfo(
    @Param() id: number,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.userRepo.updateInfo(id, body);
  }

  @Get('verify')
  verifyUser(@Headers() token: string): Promise<Error | object | boolean> {
    return this.userRepo.verifyUser(token);
  }
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return this.userRepo.googleLogin(req);
  }
  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.userRepo.googleLogin(req);
  }
  @Post('ticket/:user_id/:event_id')
  buyTicket(
    @Param('user_id') user_id: number,
    @Param('event_id') event_id: number,
  ): Promise<Error | string | any> {
    return this.userRepo.buyTicket(user_id, event_id);
  }
  @Put('updateplanner/:id')
  updatetoPlanner(
    @Param() id: number,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.userRepo.updatetoPlanner(id, body);
  }
  @Get('eventPlanners')
  getEventPlanner(@Body() req): Promise<Error | object> {
    return this.userRepo.getEventPlanner(req);
  }
  @Get('getplanner')
  getplanner(@Req() req): Promise<Error | object> {
    return this.userRepo.getplanner(req);
  }
  @Patch('plannerDemand/:id')
  upgradePlannerDemande(@Param() id): Promise<Error | string> {
    return this.userRepo.upgradePlannerDemande(id);
  }
  @Put('upload/:id')
  uploadPic(
    @Param() id: object,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.userRepo.uploadPic(id, body);
  }
}
