import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Raw, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventQuery } from './dto/find-event-query.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const newEvent = await this.eventRepository.create(createEventDto);
    return this.eventRepository.save(newEvent);
  }

  async delete(eventId: string) {
    const event = await this.eventRepository.findOne({
      where: { eventId },
    });
    if (event) {
      await this.eventRepository.remove(event);
    }
    return;
  }

  async findEvents(query: FindEventQuery) {
    const { limit, offset, hosterId, participantId } = query;
    let result = [];
    result = await this.eventRepository.find({
      where: {
        hoster: { userId: hosterId },
        participants: Raw(
          (alias) => `participants @> '[{"userId":"${participantId}"}]'`,
        ),
      },
      skip: offset,
      take: limit,
    });

    return result;
  }

  async findOne(id: string) {
    try {
      const result = await this.eventRepository.findOne({
        where: { eventId: id },
      });
      return result;
    } catch (err) {
      throw new NotAcceptableException();
    }
  }

  async update(eventId: string, updateEventDto: UpdateEventDto) {
    const updateEvent = await this.findOne(eventId);
    updateEvent.title = updateEventDto.title;
    updateEvent.announcements = updateEventDto.announcements;
    updateEvent.participants = updateEventDto.participants;
    await this.eventRepository.save(updateEvent);
  }
}
