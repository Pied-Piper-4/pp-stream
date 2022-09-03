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
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
