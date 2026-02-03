import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import * as client from '@prisma/client';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.taskService.getTaskById(Number(id));
    if (!taskFound) {
      throw new NotFoundException('Task not found');
    }
    return taskFound;
  }

  @Post()
  async createTask(@Body() data: client.Task) {
    return this.taskService.createTask(data);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: client.Task) {
    return this.taskService.updateTask(Number(id), data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(Number(id));
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }
}
