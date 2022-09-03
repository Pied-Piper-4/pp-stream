import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MeetingStatus } from './meeting.enum';

@Schema()
export class LiveUsers {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: MeetingStatus,
    enum: Object.values(MeetingStatus),
  })
  status: string;
  online: boolean;
}

export type MeetingDocument = Meeting & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
    getters: true,
  },
  optimisticConcurrency: true,
  collection: 'meeting',
})
export class Meeting {
  @Prop({ required: true, ref: 'user' })
  creatorId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  liveUsers: LiveUsers[];

  @Prop({
    type: Boolean,
    default: false,
  })
  closed: boolean;

  @Prop({
    type: String,
  })
  link: string;

  @Prop({
    default: [
      'https://firebasestorage.googleapis.com/v0/b/pp-stream.appspot.com/o/Bg1.png?alt=media&token=2c60e303-16c1-4c65-8221-0f97b687ead3',
      'https://firebasestorage.googleapis.com/v0/b/pp-stream.appspot.com/o/Bg2.png?alt=media&token=579d27bd-1a6f-4123-b2cd-181b3a2200e2',
      'https://firebasestorage.googleapis.com/v0/b/pp-stream.appspot.com/o/Bg3.png?alt=media&token=f83d324f-294a-4b8b-8cc5-1e54e32d45bf',
      'https://firebasestorage.googleapis.com/v0/b/pp-stream.appspot.com/o/Bg4.png?alt=media&token=5790a00d-8ec4-49cf-a695-e1e1df6936e5',
    ].at(Math.random() * 4),
  })
  thumbnail: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
