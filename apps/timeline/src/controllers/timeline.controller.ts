import { Controller } from '@nestjs/common';
import { TimelineService } from '../services';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}
}
