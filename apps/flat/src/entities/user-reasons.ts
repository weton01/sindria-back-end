import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserReasonsDocument = UserReasons & Document;

@Schema({ timestamps: true })
export class UserReasons {
  @Prop({
    default: true,
  })
  findMate: boolean;

  @Prop({
    default: true,
  })
  rentProperty: boolean;

  @Prop({
    default: true,
  })
  advertiseProperty: boolean;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}

export const UserReasonsSchema = SchemaFactory.createForClass(UserReasons);
