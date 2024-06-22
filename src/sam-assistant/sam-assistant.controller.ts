import { Body, Controller, Post } from '@nestjs/common';
import { SamAssistantService } from './sam-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('sam-assistant')
export class SamAssistantController {
  constructor(private readonly samAssistantService: SamAssistantService) {}

  @Post('created-thread') async createThread(){
    return await this.samAssistantService.creatThead();
  }

  @Post('user-question') async userQuestion(
    @Body() questionDto:QuestionDto
  ){
    return await this.samAssistantService.userQuestion(questionDto);
  }


}
