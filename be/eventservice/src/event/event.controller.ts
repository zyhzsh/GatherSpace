import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventQuery } from './dto/find-event-query.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Post()
  createEvent(@Body() newEvent: CreateEventDto) {
    return this.eventService.create(newEvent);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.delete(id);
  }

  @Put(':id')
  updateEvent(@Param('id') id: string, @Body() updateEvent: UpdateEventDto) {
    //console.log(updateEvent);
    return this.eventService.update(id, updateEvent);
  }

  // @Get()
  // getEvents(@Query() searchQuery: FindEventQuery) {
  //   return this.eventService.findEvents(searchQuery);
  // }
}
