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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Post as PostEntity } from 'src/database';

// @UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.messagesService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
