import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar.module';

@Module({
  imports: [CalendarModule],
})
export class AppModule {}
