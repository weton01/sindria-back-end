import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schem } from 'mongoose';

export type FavoritePropertyDocument = FavoriteProperty & Document;

@Schema({ timestamps: true })
export class FavoriteProperty {
  @Prop({
    type: Schem.Types.ObjectId,
    ref: 'Properties',
    autopopulate: true,
  })
  property: any;
}

export const FavoritePropertySchema =
  SchemaFactory.createForClass(FavoriteProperty);
