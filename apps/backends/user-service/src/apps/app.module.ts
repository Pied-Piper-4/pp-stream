import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from '../mongoose/mongoose';
import { UserModule } from './user/user.module';
import { MeetingModule } from './meeting/meeting.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    UserModule,
    MeetingModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
