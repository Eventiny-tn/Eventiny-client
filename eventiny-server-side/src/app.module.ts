import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { GoogleStrategy } from 'src/auth/google-strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { PlannerRequestModule } from './planner-request/planner-request.module';
import { User } from './user/user.entity';
import { ImagesModule } from './images/images.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    EventModule,
    CategoryModule,
    PlannerRequestModule,
    TypeOrmModule.forFeature([User]),
    ImagesModule,
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.elasticemail.com',
        port: process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USERNAME, // generated ethereal user
          pass: process.env.MAIL_PASS, // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <eventiny.tn@gmail.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
  exports: [AppService],
})
export class AppModule {}
