import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../database/entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createPost: CreatePostDto) {
    const post = this.messageRepository.create({
      ...createPost,
    });
    try {
      return await this.messageRepository.save(post);
    } catch (error) {
      throw new BadRequestException(`${error.driverError.detail}`);
    }
  }

  async findOne(id: string) {
    console.log(id);
    const post = await this.messageRepository.findOne({
      where: { user: id },
      relations: ['user'],
      select: ['id', 'title', 'text', 'createdAt', 'updatedAt', 'user'],
    });

    if (!post) throw new NotFoundException('Message not found');

    return {
      post,
      message: 'Message found successfully',
    };
  }

  async findOwnerAll(id: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: {
        user: id,
      },
    });
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({});
  }

  async remove(id: string) {
    const { post } = await this.findOne(id);

    if (!post) throw new NotFoundException('Message not found');
    return await this.messageRepository.delete(id);
  }
}
