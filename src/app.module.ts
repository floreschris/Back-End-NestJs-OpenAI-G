import { Module } from '@nestjs/common';
import { AiGptModule } from './ai-gpt/ai-gpt.module';
import { ConfigModule } from '@nestjs/config';
import { SamAssistantModule } from './sam-assistant/sam-assistant.module';

@Module({


  imports: [

    ConfigModule.forRoot(),
    AiGptModule,
    SamAssistantModule,

  ]
})
export class AppModule { }
