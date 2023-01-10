import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../database/entities/message.entity';
import { CreateMessageDto } from './dto/createMessage.dto';
import { FindMessageDto } from './dto/findMessage.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createPost: CreateMessageDto) {
    const post = this.messageRepository.create({
      ...createPost,
    });
    try {
      return await this.messageRepository.save(post);
    } catch (error) {
      throw new BadRequestException(`${error.driverError.detail}`);
    }
  }

  async findOne(id: number): Promise<Message> {
    const post = await this.messageRepository.findOne({
      where: { id: id },
      select: ['id', 'title', 'text', 'createdAt', 'updatedAt', 'user'],
    });
    if (!post) throw new NotFoundException('Message not found');
    return post;
  }

  async findOwnerAll(find: any): Promise<Message[]> {
    try {
      return await this.messageRepository.find({
        where: {
          user: {
            id: find.user,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(`${error.driverError}`);
    }
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({});
  }

  async remove(id: string) {
    const response = await this.findOne(+id);

    if (!response) throw new NotFoundException('Message not found');
    return await this.messageRepository.delete(id);
  }

  async findFilterMessage<T>(findMessage: FindMessageDto): Promise<T> {
    console.log(findMessage);
    return null;
  }
}
