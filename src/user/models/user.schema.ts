import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'Users' })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
