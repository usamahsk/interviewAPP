import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  message: string;

  @Prop()
  timeStamp: string;

  @Prop()
  categoryName: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
