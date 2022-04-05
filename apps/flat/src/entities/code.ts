import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserSchema, User } from './user';

export type CodeDocument = Code & Document;

@Schema({ timestamps: true })
export class Code {
  _id: string;

  @Prop({ type: 'Number' })
  code: number;

  @Prop({ type: UserSchema })
  user: User;

  @Prop({ default: false })
  used: boolean;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;

}

export const CodeSchema = SchemaFactory.createForClass(Code);