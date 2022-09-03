import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from '../user/user.module';
import { MeetingModule } from '../meeting/meeting.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from '../jwt/jwt.config.service';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [CommentController],
  providers: [CommentService, ChatGateway],
  imports: [
    UserModule,
    MeetingModule,
    MongooseModule.forFeatureAsync([
      {
        name: Comment.name,
        useFactory: () => {
          const commentSchema = CommentSchema;

          return commentSchema;
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
})
export class CommentModule {}
