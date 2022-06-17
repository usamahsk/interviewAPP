import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { TaskDto } from './task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskPayload: TaskDto): Promise<Task> {
    createTaskPayload.uuid = uuidv4();
    const createdTask = new this.taskModel(createTaskPayload);
    return createdTask.save();
  }

  async delete(id: string): Promise<any> {
    return this.taskModel.deleteOne({ id });
  }

  async findOne(query): Promise<Task> {
    return this.taskModel.findOne(query);
  }

  async updateOne(query, options?): Promise<any> {
    return this.taskModel.updateOne(query, options);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async aggregate() {
    return this.taskModel.aggregate([
      {
        $group: {
          _id: '$categoryName',
          taskCount: { $sum: 1 },
        },
      },
    ]);
  }
}
