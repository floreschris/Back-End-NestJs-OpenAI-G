
import { Injectable, NotFoundException } from '@nestjs/common';
import { audioToTextUseCase, imageGenerationUseCase, orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, textToAudioUseCase, translateUseCase, imageVariationUseCase,imageToTextUseCase } from './use-cases';
import { AudioToTextDto, OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto, ImageGenerationDto, ImageVariationDto } from './dtos';
import OpenAI from 'openai';
import * as path from "path";
import * as fs from "fs";


@Injectable()
export class AiGptService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })


  //solo llamar casos de uso

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }


  async translateText({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async texToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  /*async texToAudioGetter( fielId: string  ) {
    const filePath = path.resolve(__dirname, '../../generated/audios/', `${fielId}.mp3`);
    const wasFound = fs.existsSync(filePath);
    if(!wasFound) throw new NotFoundException(`File ${fielId} not found`)
    //const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);
    //return await textToAudioUseCase(this.openai, { prompt, voice });

    return filePath;
  }*/

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios/',
      `${fileId}.mp3`,
    );

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;
  }


  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto: AudioToTextDto,
  ) {
    const { prompt } = audioToTextDto;

    return await audioToTextUseCase(this.openai, { audioFile, prompt });
  }


  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, { ...imageGenerationDto });
  }

  getGeneratedImage(fileName: string) {

    const filePath = path.resolve('./', './generated/images/', fileName);
    const exists = fs.existsSync(filePath);


    if (!exists) {
      throw new NotFoundException('File not found');
    }

    return filePath;
  }


  async geneateImageVariation( { baseImage }: ImageVariationDto ) {
    return imageVariationUseCase( this.openai, { baseImage } );
  }
  async imageToText(imageFile: Express.Multer.File, prompt: string) {
    return await imageToTextUseCase(this.openai, { imageFile, prompt });
  }

}
