import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { DecisiveMatch, DecisiveMatchSchema } from './decisive-match';
import { FavoriteProperty, FavoritePropertySchema } from './favoriet-property';
import { FavoriteChat, FavoriteChatSchema } from './favorite-chat';
import { FlatmatchSetup, FlatmatchSetupSchema } from './flatmatch-setup';
import { Image, ImageSchema } from './image';
import { InterestTags, InterestTagsSchema } from './interest-tags';
import { MemberGetMember } from './member-get-member';
import { RoommateMatched, RoommateMatchedSchema } from './roommate-matched';
import { RoommateSetup, RoommateSetupSchema } from './roommate-setup';
import { UserReasons, UserReasonsSchema } from './user-reasons';

export type UserDocument = User & Document;
@Schema({ timestamps: true,  })
export class User {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ lowercase: true })
  email: string;

  @ApiProperty()
  @Prop()
  cellphone: string;

  @ApiProperty()
  @Prop()
  firstName: string;

  @ApiProperty()
  @Prop()
  lastName: string;

  @Prop({ default: false })
  isGoogle: boolean;

  @Prop({ default: false })
  isFacebook: boolean;

  @Prop()
  providerId: string;

  @Prop()
  avatar: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  age: number;

  @Prop()
  providerName: string;

  @Prop()
  description: string;

  @Prop({
    enum: ["admin", "user"]
  })
  haveHome: string;

  @Prop({
    enum: ["admin", "user"]
  })
  role: string;

  @Prop({
    default: 1300
  })
  monthlyBudget: number;

  @Prop()
  workDetail: string;

  @Prop()
  companyName: string;

  @Prop()
  gender: string;

  @Prop()
  studyDetail: string;

  @Prop()
  memberGetMemberUrl: string;

  @Prop()
  inactiveReason: string;

  @Prop()
  customerStripeId: string;

  @Prop()
  inactiveDate: Date;

  @Prop()
  lastLogin: Date;

  @Prop()
  lastAccess: Date;

  @Prop()
  isNewbie: boolean;

  @Prop({
    default: false
  })
  onBoardingProfileFinished: boolean;

  @Prop({
    default: false
  })
  active: boolean;

  @Prop({
    default: false
  })
  coachMarkFinished: boolean;

  @Prop({
    default: false
  })
  accountDeleted: boolean;

  @Prop({
    default: false
  })
  showedCeo: boolean;

  @Prop({
    default: false
  })
  showNopeTutorial: boolean;

  @Prop({
    default: false
  })
  showYeapTutorial: boolean;

  @Prop({
    default: false
  })
  showChatTutorial: boolean;

  @Prop({
    type: FlatmatchSetupSchema
  })
  flatmatchSetup: FlatmatchSetup;
  
  @Prop({
    type: RoommateSetupSchema
  })
  roommateSetup: RoommateSetup;

  @Prop({
    type: UserReasonsSchema
  })
  userReasons: UserReasons;

  @Prop({
    type: ImageSchema
  })
  images: [Image];

  @Prop({
    type: InterestTagsSchema
  })
  interestTags: [InterestTags];

  @Prop({
    type: RoommateMatchedSchema
  })
  roommateMatch: [RoommateMatched];

  @Prop({
    type: FavoriteChatSchema
  })
  favoriteChat: [FavoriteChat];

  @Prop({
    type: FavoritePropertySchema
  })
  favoriteProperty: [FavoriteProperty];

  @Prop({
    type: DecisiveMatchSchema
  })
  decisiveMatch: [DecisiveMatch];
  
  memberGetMemberIds: [MemberGetMember];

  @Prop({ name: 'created_at' })
  createdAt: Date;

  @Prop({ name: 'updated_at' })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);