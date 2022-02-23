import { TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar.module';
import { TaskModule } from './task.module';

@Module({
  imports: [CalendarModule, TaskModule, TypeormConfig],
})
export class AppModule {}
