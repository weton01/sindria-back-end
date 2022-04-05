import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InterestTagsDocument = InterestTags & Document;

@Schema({ timestamps: true })
export class InterestTags {
  @Prop()
  tagType: string;

  @Prop()
  iconType: string;

  @Prop()
  icon: string;

  @Prop()
  title: string;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}

export const InterestTagsSchema = SchemaFactory.createForClass(InterestTags);