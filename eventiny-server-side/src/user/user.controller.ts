import { Body, Controller, Post } from '@nestjs/common';

import { Userinfo, UserLog } from './user.entity';
import { UserService } from './user.service';
@Controller()
export class UserController {
  constructor(private readonly userRepo: UserService) {}
  @Post('signup')
  signup(@Body() body: Userinfo): Promise<string | Error> {
    return this.userRepo.signup(body);
  }
  @Post('login')
  login(@Body() body: UserLog): Promise<object | string | Error> {
    return this.userRepo.login(body);

  }
}
