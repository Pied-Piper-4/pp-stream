import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from './meeting.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from '../jwt/jwt.config.service';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../user/user.model';

@Module({
  controllers: [MeetingController],
  providers: [MeetingService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Meeting.name,
        useFactory: () => {
          const meetingSchema = MeetingSchema;

          return meetingSchema;
        },
      },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
    UserModule,
  ],
  exports: [MeetingService],
})
export class MeetingModule {}
