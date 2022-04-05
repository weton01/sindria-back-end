import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserSchema, User } from './user';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
  @Prop()
  source: string;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);