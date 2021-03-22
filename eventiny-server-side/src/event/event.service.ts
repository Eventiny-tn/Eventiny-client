import { Event } from './event.entity';
import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, getManager } from 'typeorm';
import { Category } from 'src/category/category.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private connection: Connection,
  ) {}
  async addEvent({
    name,
    time,
    dateStart,
    dateEnds,
    location,
    price,
    images,
    caption,
    cover,
    categories,
  }): Promise<Error | string> {
    if (name) {
      // await this.eventRepository.
      let event = new Event(
        name,
        time,
        dateStart,
        dateEnds,
        location,
        price,
        images,
        caption,
        cover,
      );
      try {
        event.categories = [];
        // find the id of the categories by name
        for (let i = 0; i < categories.length; i++) {
          var currentObj = await this.categoryRepository.find({
            name: categories[i],
          });
          if (currentObj.length > 0) {
            event.categories.push(currentObj[0]);
          }
        }
        await this.connection.manager.save(event);
        return 'done';
      } catch (err) {
        return new NotFoundException('NOT FOUND');
      }
    }
  }

  async getAllEvent(req): Promise<Error | object> {
    if (req) {
      const data = await this.eventRepository.find();
      return data;
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
  async getEventByCategory(@Body() body): Promise<Error | any> {
    const events = await this.eventRepository.findByIds(body.categoryID);
    console.log(events);
  }
  async updateByid(id, body): Promise<Error | string> {
    console.log(body);

    if (id && body) {
      await this.eventRepository.update(id, body);
      return 'done';
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
  async deleteOneById(id: number): Promise<Error | string> {
    if (id) {
      await this.eventRepository.delete(id);
      return 'done';
    } else {
      return new NotFoundException('NOT FOUND');
    }
  }
  async filterEventByCategory(id): Promise<Error | Object> {
    console.log('=======>', id.id);
    const events = await this.connection.manager
      .getRepository(Event)
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.categories', 'category')
      .where(`event_id = ${id.id}`)
      .getMany();
    return events;
  }
}
