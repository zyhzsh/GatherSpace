import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { v4 as uuid_v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotAcceptableException } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  isUserExist: jest.fn((entity) => entity),
}));

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockType<Repository<User>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create Profile', () => {
    // it('Create a new profile', async () => {
    //   // Arrange
    //   const userId = uuid_v4();
    //   const newUser: CreateUserDto = {
    //     userId,
    //     userName: 'Sample',
    //     selfIntro: '',
    //     profileImage: '',
    //   };
    //   // Act
    //   const userProfile = await service.create(newUser);
    //   // Assert
    //   expect(userProfile.userName).toEqual('Sample');
    // });
    // it('Create a new profile with exist profile', async () => {
    //   // Arrange
    //   const userId = uuid_v4();
    //   const newUser1: CreateUserDto = {
    //     userId,
    //     userName: 'Sample',
    //     selfIntro: '',
    //     profileImage: '',
    //   };
    //   const newUser2: CreateUserDto = {
    //     userId,
    //     userName: 'Sample',
    //     selfIntro: '',
    //     profileImage: '',
    //   };
    //   try {
    //     // Act
    //     await service.create(newUser1);
    //     await service.create(newUser2);
    //   } catch (err) {
    //     // Assert
    //     expect(err).toBeInstanceOf(NotAcceptableException);
    //   }
    // });
  });
});
