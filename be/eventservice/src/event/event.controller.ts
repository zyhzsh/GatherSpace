import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventQuery } from './dto/find-event-query.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { Request } from 'express';

@Controller('api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get(':id')
  @UseGuards(AuthorizationGuard)
  getMyEvent(@Param('id') id: string, @Req() req: Request) {
    const userId = req['auth'].sub;
    return this.eventService.findMyEventById(id, userId);
  }

  @Post()
  @UseGuards(AuthorizationGuard)
  createMyEvent(@Body() newEvent: CreateEventDto, @Req() req: Request) {
    const userId = req['auth'].sub;
    return this.eventService.createMyEvent(newEvent, userId);
  }

  @Delete(':id')
  @UseGuards(AuthorizationGuard)
  deleteMyEvent(@Param('id') id: string, @Req() req: Request) {
    const userId = req['auth'].sub;
    return this.eventService.deleteMyEvent(id, userId);
  }

  @Put(':id')
  @UseGuards(AuthorizationGuard)
  updateMyEvent(
    @Param('id') id: string,
    @Body() updateEvent: UpdateEventDto,
    @Req() req: Request,
  ) {
    const userId = req['auth'].sub;
    return this.eventService.updateMyEvent(id, updateEvent, userId);
  }

  @Get()
  @UseGuards(AuthorizationGuard)
  getMyEvents(@Query() searchQuery: FindEventQuery, @Req() req: Request) {
    const userId = req['auth'].sub;
    return this.eventService.findMyEvents(searchQuery, userId);
  }
}
