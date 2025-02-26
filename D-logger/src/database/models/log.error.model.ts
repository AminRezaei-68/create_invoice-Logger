import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogErrorDocument = HydratedDocument<Error>;

@Schema({ timestamps: true, versionKey: false, collection: 'errors' })
export class LogError {
  @Prop({
    type: [String],
  })
  errorMessages: string[];

  @Prop({ type: String })
  errorName: string;

  //   @Prop({ type: Object })
  //   data: Object;
}

export const LogErrorSchema = SchemaFactory.createForClass(LogError);
