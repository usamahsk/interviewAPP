import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskAggregateService } from '../aggregate/task-aggregate.service';
import { TaskDto, UpdateTaskDto } from '../entity/task.dto';
import { TaskService } from '../entity/task.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskAggService: TaskAggregateService,
  ) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCategory(@Body() createTaskPayoad: TaskDto) {
    return await this.taskAggService.createTask(createTaskPayoad);
  }

  @Get('list')
  async listCategory() {
    return await this.taskService.findAll();
  }

  @Get('aggregated_data')
  async aggregateTask() {
    return await this.taskService.aggregate();
  }

  @Post('update/:uuid')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateTask(
    @Body() updateTaskPayoad: UpdateTaskDto,
    @Param() uuid: string,
  ) {
    return await this.taskAggService.updateTask(uuid, updateTaskPayoad);
  }

  @Post('delete/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async deleteTask(@Param() id: string) {
    return await this.taskAggService.deleteTask(id);
  }
}
