import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreatePostDto } from './dto';
import { Message as PostEntity } from 'src/database';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.messagesService.create(createPostDto);
  }

  @Get('all')
  findAll(): Promise<PostEntity[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
