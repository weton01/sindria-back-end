import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlatmatchSetupDocument = FlatmatchSetup & Document;

@Schema({timestamps: true})
export class FlatmatchSetup {
  @Prop({
    enum: ["apartment", "home"],
    default: ["apartment", "home"]
  })
  propertyType: string;

  @Prop({
    coordinates: [],
    name: String
  })
  place: string

  @Prop({
    default: 10
  })
  areaRange: number;

  @Prop({
    default: [500, 2000]
  })
  amountRange: number[]

  @Prop({
    default: [20, 150]
  })
  usefulArea: number[]

  @Prop({
    enum: [1, 2, 3, 4],
    default: 2
  })
  numberOfbedroom: number

  @Prop({
    enum: [0, 1, 2, 3, 4],
    default: 1
  })
  parkingSpace: number

  @Prop({
    enum: [1, 2, 3, 4],
    default: 2
  })
  noOfBathroom: number;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}

export const FlatmatchSetupSchema = SchemaFactory.createForClass(FlatmatchSetup);