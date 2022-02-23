import { Controller, Get } from '@nestjs/common';
import { TaskService } from '../services/task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getHello(): string {
    return this.taskService.getHello();
  }
}
