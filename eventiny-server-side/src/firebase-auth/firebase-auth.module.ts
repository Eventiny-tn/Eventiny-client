import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseAuthController } from './firebase-auth.controller';

@Module({
  providers: [FirebaseAuthService],
  controllers: [FirebaseAuthController]
})
export class FirebaseAuthModule {}
