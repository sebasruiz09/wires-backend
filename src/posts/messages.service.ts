import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { CreatePostDto } from './dto';
import { Post } from 'src/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { equals } from 'class-validator';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create({ content, title, userId }: CreatePostDto) {
    const post = this.postRepository.create({
      text: content,
      title,
      user: {
        id: userId,
      },
    });
    try {
      return await this.postRepository.save(post);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
      select: ['id', 'title', 'text', 'createdAt', 'updatedAt', 'user'],
    });

    if (!post) throw new NotFoundException('Message not found');

    return {
      post,
      message: 'Message found successfully',
    };
  }

  async findOwnerAll(): Promise<Post[]> {
    return [];
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async remove(id: number) {
    const { post } = await this.findOne(id);

    if (!post) throw new NotFoundException('Message not found');
    return await this.postRepository.delete(id);
  }
}
