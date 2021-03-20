import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Put,
  Param,
} from '@nestjs/common';

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
}
