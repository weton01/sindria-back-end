import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoommateSetupDocument = RoommateSetup & Document;

@Schema({ timestamps: true })
export class RoommateSetup {
  @Prop({
    enum: ['no', 'yes'],
    default: 'yes',
  })
  men: string;

  @Prop({
    enum: ['no', 'yes'],
    default: 'yes',
  })
  woman: string;

  @Prop({
    enum: ['no', 'yes'],
    default: 'yes',
  })
  indifferent: string;

  @Prop({
    default: 18,
  })
  minAge: number;

  @Prop({
    default: 60,
  })
  maxAge: number;

  @Prop({
    enum: ['no', 'yes'],
    default: 'no',
  })
  haveAnimals: string;

  @Prop({
    enum: ['no', 'yes'],
    default: 'no',
  })
  smoker: string;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}

export const RoommateSetupSchema = SchemaFactory.createForClass(RoommateSetup);
