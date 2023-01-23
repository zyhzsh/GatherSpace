import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { userId } = createUserDto;
    const result = await this.isUserExist(userId);
    if (result) {
      throw new NotAcceptableException();
    } else {
      const newUser = await this.userRepository.create(createUserDto);
      return this.userRepository.save(newUser);
    }
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { userId: id } });
  }

  async isUserExist(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.isUserExist(id);
      if (result) {
        const updatedResult = await this.userRepository
          .createQueryBuilder()
          .update(updateUserDto)
          .where({ userId: id })
          .returning('*')
          .execute();
        const user = updatedResult.raw[0];
        return user;
      } else {
        throw new BadRequestException('asdsds');
      }
    } catch (err) {
      return err.response;
    }
  }

  async remove(id: string) {
    const userProfileToRemove = await this.findOne(id);
    if (userProfileToRemove) {
      await this.userRepository.remove(userProfileToRemove);
    }
    return;
  }
}
