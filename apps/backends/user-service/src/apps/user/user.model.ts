import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

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
  collection: 'user',
})
export class User {
  @Prop()
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    sparse: true,
  })
  email: string;

  @Prop({
    unique: true,
    sparse: true,
  })
  phone: string;

  @Prop({
    select: false,
  })
  password: string;

  @Prop({
    default: [
      'https://phubie-main.s3.amazonaws.com/admin/avatar/avatar1.svg',
      'https://phubie-main.s3.amazonaws.com/admin/avatar/avatar2.svg',
      'https://phubie-main.s3.amazonaws.com/admin/avatar/avatar3.svg',
      'https://phubie-main.s3.amazonaws.com/admin/avatar/avatar4.svg',
    ].at(Math.random() * 4),
  })
  pic: string;

  @Prop({
    default: false,
  })
  blocked: boolean;

  @Prop()
  passwordChangedAt: Date;

  @Prop()
  passwordResetToken: string;

  @Prop()
  passwordResetExpires: Date;

  @Prop()
  passwordResetOtp: string;

  @Prop()
  bio: string;

  @Prop({
    default: false,
  })
  isGoogleAuth: boolean;

  @Prop({
    default: true,
  })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
