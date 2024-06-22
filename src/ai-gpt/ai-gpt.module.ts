import { Module } from '@nestjs/common';
import { AiGptService } from './ai-gpt.service';
import { AiGptController } from './ai-gpt.controller';

@Module({
  controllers: [AiGptController],
  providers: [AiGptService],
})
export class AiGptModule {}
