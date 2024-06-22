import { IsString, isString } from "class-validator"; 

export class ImageVariationDto  {

  @IsString()
  readonly baseImage: string;

}
