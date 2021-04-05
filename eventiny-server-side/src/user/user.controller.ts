import { Patch, Req, UseGuards, Param } from '@nestjs/common';
import { Body, Controller, Get, Post, Headers, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Userinfo, UserLog } from './user.entity';
import { UserService } from './user.service';

export class EventPlannerID {
  @ApiProperty()
  id: number;
}
export class UploadUserImageProfile {
  @ApiProperty()
  userimg: string;
}
export class UserInformation {
  @ApiProperty()
  username: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phone: string;
  birthday: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  userimg: string;
  @ApiProperty()
  postalcode: string;
  @ApiProperty()
  isBanned: boolean;
  @ApiProperty()
  plannerDemand: boolean;
  @ApiProperty()
  reportCounter: number;
}
export class UserSignUp {
  @ApiProperty()
  username: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
}
export class UserAfterSignUp {
  @ApiProperty()
  user: Userinfo;
  @ApiProperty()
  token: string;
}
export class UserLogin {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
export class UserAfterLogin {
  @ApiProperty()
  auth: Boolean;
  @ApiProperty()
  token: string;
}

export class TicketUserEvent {
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  event_id: number;
}

export class ChangeUserPassword {
  @ApiProperty()
  currentPass: string;
  @ApiProperty()
  password: string;
}
@Controller('users')
export class UserController {
  constructor(private readonly userRepo: UserService) {}
  @ApiTags('users')
  @Post('signup')
  @ApiCreatedResponse({
    description: 'User has been successfully created.',
    type: UserAfterSignUp,
  })
  @ApiUnauthorizedResponse({ description: 'Invalide Cridentials' })
  @ApiBody({ type: UserSignUp, required: true })
  signup(@Body() body: Userinfo): Promise<object | Error> {
    return this.userRepo.signup(body);
  }
  /***** */

  @ApiTags('users')
  @Post('login')
  @ApiCreatedResponse({
    description: 'User has been successfully logged.',
    type: UserAfterLogin,
  })
  @ApiUnauthorizedResponse({ description: 'Invalide Cridentials' })
  @ApiBody({ type: UserLogin, required: true })
  login(@Body() body: UserLog): Promise<object | string | Error> {
    return this.userRepo.login(body);
  }
  /***** */

  // @Get('profile')
  // getinfo(@Headers() header): Promise<object | string> {
  //   return this.userRepo.getinfo(header.authorisation);
  // }

  /***** */

  @ApiTags('users')
  @Put('updateinfo/:id')
  updateInfo(
    @Param() id: number,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.userRepo.updateInfo(id, body);
  }

  /***** */

  @ApiTags('users')
  @Get('verify')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'User information from the data bases.',
    type: UserInformation,
  })
  @ApiUnauthorizedResponse({ description: 'Invalide Cridentials' })
  verifyUser(@Headers() token: string): Promise<Error | object | boolean> {
    return this.userRepo.verifyUser(token);
  }

  /***** */

  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {
  //   return this.userRepo.googleLogin(req);
  // }
  // @Get('auth/google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.userRepo.googleLogin(req);
  // }

  /***** */

  @ApiTags('users')
  @ApiCreatedResponse({
    description: 'User ID and Event ID are required',
    type: TicketUserEvent,
  })
  @ApiUnauthorizedResponse({ description: 'Not Found' })
  @Post('ticket/:user_id/:event_id')
  buyTicket(
    @Param('user_id') user_id: number,
    @Param('event_id') event_id: number,
  ): Promise<Error | string | any> {
    return this.userRepo.buyTicket(user_id, event_id);
  }
  /***** */

  @ApiTags('users')
  @Put('updateplanner/:id')
  updatetoPlanner(
    @Param() id: number,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.userRepo.updatetoPlanner(id, body);
  }

  /***** */

  @ApiTags('users')
  @Get('eventPlanners')
  getEventPlanner(@Body() req): Promise<Error | object> {
    return this.userRepo.getEventPlanner(req);
  }
  @ApiTags('users')
  @Get('getplanner')
  @ApiResponse({
    description: 'Returns back all the Event Planners',
    status: 201,
    type: Array,
  })
  getplanner(@Req() req): Promise<Error | object> {
    return this.userRepo.getplanner(req);
  }

  /***** */

  @ApiTags('users')
  @ApiCreatedResponse({
    description: 'upgraded',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiUnauthorizedResponse({ description: 'Not Found' })
  @Patch('plannerDemand/:id')
  upgradePlannerDemande(@Param() id): Promise<Error | string> {
    return this.userRepo.upgradePlannerDemande(id);
  }
  /***** */

  @ApiTags('users')
  @Put('upload/:id')
  @ApiResponse({
    status: 201,
    description: 'giving an image URL and user_id',
  })
  @ApiUnauthorizedResponse({ description: 'Not Found' })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({
    type: UploadUserImageProfile,
  })
  uploadPic(
    @Param() id: object,
    @Body() body: object,
  ): Promise<Error | string> {
    return this.userRepo.uploadPic(id, body);
  }

  /***** */

  @ApiTags('users')
  @ApiCreatedResponse({
    status: 201,
    type: String,
    description: 'giving a Current Password, New Password and user_id',
  })
  @ApiUnauthorizedResponse({ description: 'Wrong Passwords' })
  @ApiBody({
    type: ChangeUserPassword,
  })
  @ApiParam({
    name: 'id',
  })
  @Put('password/:id')
  updateUserPassword(@Body() body, @Param() id): Promise<Error | string> {
    return this.userRepo.updateUserPassword(id, body);
  }
  /***** */
}
