import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
    getters: true,
  },
})
export class Comments {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  comment: string;

  @Prop({
    default: 0,
    type: Number,
  })
  likes: number;

  @Prop({
    default: 0,
    type: Number,
  })
  dislikes: number;
}

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
export class Comment {
  @Prop({ required: true, ref: 'meeting' })
  meetingId: mongoose.Schema.Types.ObjectId;

  @Prop()
  comments: Comments[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
