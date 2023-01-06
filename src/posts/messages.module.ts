import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Post])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
