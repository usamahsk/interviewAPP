import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryService } from '../../category/entity/category.service';
import { TaskDto, UpdateTaskDto } from '../entity/task.dto';
import { TaskService } from '../entity/task.service';

@Injectable()
export class TaskAggregateService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly taskService: TaskService,
  ) {}

  async createTask(createTaskPayload: TaskDto) {
    await this.validatecategory(createTaskPayload.categoryName);
    createTaskPayload.timeStamp = new Date();
    return await this.taskService.create(createTaskPayload);
  }

  async updateTask(id: string, updatepayload: UpdateTaskDto) {
    await this.validateTask(id);
    if (updatepayload.categoryName)
      await this.validatecategory(updatepayload.categoryName);
    return await this.taskService.updateOne({ id }, { $set: updatepayload });
  }

  async deleteTask(id: string) {
    await this.validateTask(id);
    return await this.taskService.delete(id);
  }

  async validatecategory(categoryName: string) {
    const category = await this.categoryService.findOne(categoryName);
    if (!category) {
      throw new BadRequestException('Category Not Found');
    }
    return category;
  }

  async validateTask(id: string) {
    const task = await this.taskService.findOne({ id });
    if (!task) {
      throw new BadRequestException('Task Not Found');
    }
    return task;
  }
}
