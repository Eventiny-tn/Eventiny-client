import { Body, Controller, Post } from '@nestjs/common';
import { Userinfo } from './user.entity';
import { UserService } from './user.service';
@Controller()
export class UserController {
  constructor(private readonly signupService: UserService) {}
  @Post('signup')
  signup(@Body() body: Userinfo): Promise<string | Error> {
    return this.signupService.signup(body);
  }
}
