import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
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
  // Admin
  async create(createEventDto: CreateEventDto) {
    const newEvent = await this.eventRepository.create(createEventDto);
    return this.eventRepository.save(newEvent);
  }
  async delete(eventId: string) {
    const event = await this.eventRepository.findOne({
      where: {
        eventId,
      },
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
          () => `participants @> '[{"userId":"${participantId}"}]'`,
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
  async findEventsByUser(query: FindEventQuery, userId: string) {
    const { limit, offset } = query;
    let result = [];
    result = await this.eventRepository.find({
      where: {
        hoster: { userId: userId },
        participants: Raw(() => `participants @> '[{"userId":"${userId}"}]'`),
      },
      skip: offset,
      take: limit,
    });

    return result;
  }
  // User specified
  async createMyEvent(createEventDto: CreateEventDto, hostId: string) {
    if (createEventDto.hoster.userId !== hostId) {
      throw new UnauthorizedException();
    }
    const newEvent = await this.eventRepository.create(createEventDto);
    return this.eventRepository.save(newEvent);
  }
  async deleteMyEvent(eventId: string, userId: string) {
    const event = await this.eventRepository.findOne({
      where: {
        eventId,
        hoster: { userId: userId },
      },
    });
    if (event) {
      await this.eventRepository.remove(event);
    }
    return;
  }
  async findMyEventById(eventId: string, userId: string) {
    try {
      const result = await this.eventRepository.findOne({
        where: {
          eventId,
          hoster: { userId: userId },
          participants: Raw(() => `participants @> '[{"userId":"${userId}"}]'`),
        },
      });
      return result;
    } catch (err) {
      throw new NotAcceptableException();
    }
  }
  async findMyEvents(query: FindEventQuery, userId: string) {
    const { limit, offset } = query;

    let result = [];
    result = await this.eventRepository.find({
      where: [
        { hoster: { userId: userId } },
        {
          participants: Raw(() => `participants @> '[{"userId":"${userId}"}]'`),
        },
      ],
      skip: offset,
      take: limit,
    });

    return result;
  }

  //TODO: implement
  async update(eventId: string, updateEventDto: UpdateEventDto) {
    const updateEvent = await this.findOne(eventId);
    updateEvent.title = updateEventDto.title;
    updateEvent.announcements = updateEventDto.announcements;
    updateEvent.participants = updateEventDto.participants;
    return await this.eventRepository.save(updateEvent);
  }
  //TODO: implement
  async updateMyEvent(eventId: string, updateEventDto: UpdateEventDto, userId) {
    const updateEvent = await this.findOne(eventId);
    if (updateEvent?.hoster?.userId !== userId) {
      throw new UnauthorizedException();
    }
    updateEvent.title = updateEventDto.title;
    updateEvent.announcements = updateEventDto.announcements;
    updateEvent.participants = updateEventDto.participants;
    return await this.eventRepository.save(updateEvent);
  }
}
