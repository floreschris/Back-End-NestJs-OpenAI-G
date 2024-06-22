import * as fs from 'fs';
import * as path from 'path';
import { url } from 'inspector';
import OpenAI from "openai";
import { downloadBase64ImageAsPng, downloadImageAsPng } from "src/helpers";

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}


export const imageGenerationUseCase = async (openai: OpenAI, options: Options) => {

    const { prompt, originalImage, maskImage } = options;

    //Todo: verificar original image

    if (!originalImage || !maskImage) {


        const response = await openai.images.generate({
            prompt: prompt,
            model: 'dall-e-3',
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            response_format: 'url'
        });

        //TODO: GUARDAR LA IKMAGE FS
        const fileName = await downloadImageAsPng(response.data[0].url);
        const url = `${process.env.SERVER_URL}/ai-gpt/image-generation/${fileName}`
        return {
            url: url,
            openAIUrl: response.data[0].url,
            revised_prompt: response.data[0].revised_prompt,
        }
    }

    // originalImage= 
    const pngImagePath = await downloadImageAsPng(originalImage,true);
    const maskPath = await downloadBase64ImageAsPng(maskImage,true)

    const response = await openai.images.edit({
        model: 'dall-e-2',
        prompt: prompt,
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(maskPath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    })

    const fileName = await downloadImageAsPng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/ai-gpt/image-generation/${fileName}`
    return {
        url: url, //TODO: http://localhost:3000/ai-gpt/image-generation/1718327494167.png
        openAIUrl: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt,
    }


}