import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallBack } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '891692944437-h62krcvdv2f2qeqdc1pimopihltpb0ae.apps.googleusercontent.com',
      clientSecret: 'Efb6PkUxeBt9p7Q7smgSNUgA',
      callbackURL: 'http://localhost:8080/GeneralPage',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallBack,
  ): Promise<any> {
    const { name, photos, emails } = profile;

    const user = await {
      email: emails[0].value,
      verifying: emails[0].verified,
      firstname: name.givenName,
      lastname: name.familyName,
      userimg: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
