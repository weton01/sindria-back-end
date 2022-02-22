import { Module } from '@nestjs/common';
import { CalendarController } from '../controllers/calendar.controller';
import { CalendarService } from '../services/calendar.service';

@Module({
  imports: [],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
