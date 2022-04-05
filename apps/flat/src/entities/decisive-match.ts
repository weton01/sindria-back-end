import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schem } from 'mongoose';
import { User } from './user';

export type DecisiveMatchDocument = DecisiveMatch & Document;

@Schema({ timestamps: true })
export class DecisiveMatch {
  @Prop({
    type: Schem.Types.ObjectId,
    ref: 'User'
  })
  sender: User
  
  @Prop({
    type: Schem.Types.ObjectId,
    ref: 'User'
  })
  receiver: User

  @Prop({
    type: Schem.Types.ObjectId,
    ref: 'User',
    enum: ["cancel", "accept", "pending"]
  })
  status: string;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}

export const DecisiveMatchSchema = SchemaFactory.createForClass(DecisiveMatch);