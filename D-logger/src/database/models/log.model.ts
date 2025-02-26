import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { ServiceNames } from 'enum/service-names.enum';
import { HydratedDocument } from 'mongoose';
import { ServiceNames } from '../../user/enum/service-names.enum';

export type LogDocument = HydratedDocument<Log>;

@Schema({ timestamps: true, versionKey: false, collection: 'logs' })
export class Log {
  @Prop({ type: String, maxLength: 100 })
  service_name: ServiceNames;

  @Prop({ type: String, maxlength: 100 })
  action: string;

  // @Prop({ type: Number })
  // version_number: number;

  // @Prop({ type: String, maxlength: 100 })
  // status: string;

  // @Prop({ type: String, maxlength: 100, default: 'unknown' })
  // issuer_full_name: string;

  @Prop({ type: Number, default: -1 })
  issuer_id: number;

  //   @Prop({ type: Object })
  //   body: Object;

  // @Prop({ type: Date })
  // time_stamp: Date;

  // @Prop({ type: Date })
  // jalali_time_stamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
