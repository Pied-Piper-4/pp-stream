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
    // select: false,
  })
  password: string;

  @Prop({
    default: [
      'https://firebasestorage.googleapis.com/v0/b/pp-stream.appspot.com/o/A1.png?alt=media&token=9351feae-ae8c-4f0c-affb-46e866b55a98',
      'https://firebasestorage.googleapis.com/v0/b/pp-stream.appspot.com/o/A2.png?alt=media&token=c28e4632-2f8f-4b5c-b1de-3ef16306fb3a',
      'https://firebasestorage.googleapis.com/v0/b/pp-stream.appspot.com/o/A3.png?alt=media&token=0b9ebd38-9a89-47fc-9487-fcb063a2ccae',
      'https://firebasestorage.googleapis.com/v0/b/pp-stream.appspot.com/o/A4.png?alt=media&token=97dd34ce-8b5e-4abc-a8b0-e53ea2722bac',
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
