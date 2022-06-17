import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entity/task.schema';
import { TaskController } from './controller/task.controller';
import { TaskService } from './entity/task.service';
import { CategoryModule } from '../category/category.module';
import { TaskAggregateService } from './aggregate/task-aggregate.service';

@Module({
  imports: [
    CategoryModule,
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskAggregateService],
})
export class TaskModule {}
