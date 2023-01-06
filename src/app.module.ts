import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigurationModule, AuthModule, PostsModule, CommonModule],
})
export class AppModule {}
