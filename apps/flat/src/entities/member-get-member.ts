import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberGetMemberDocument = MemberGetMember & Document;

@Schema({ timestamps: true })
export class MemberGetMember {
  @Prop()
  idMember: string;

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}

export const MemberGetMemberSchema = SchemaFactory.createForClass(MemberGetMember);