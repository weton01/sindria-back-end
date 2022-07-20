import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

import { Injectable } from '@nestjs/common';
import { envs } from '@app/common';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: envs.FACEBOOK_AUTH_CLIENT_ID,
      clientSecret: envs.FACEBOOK_AUTH_CLIENT_SECRET,
      callbackURL: `http://${envs.REDIRECT_URL}/auth/facebook/callback`,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
