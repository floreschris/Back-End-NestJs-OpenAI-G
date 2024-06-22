import OpenAI from 'openai';
import { Options } from '@nestjs/common';

interface Options{
    threadId:string;
    assistanId?:string;
}

export const createRunUseCase = async (openai:OpenAI, options:Options) =>{
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXX: AQUI TIENES QUE PONER EL API-KEY DE TU ASISTENTE PERSONALIZADO 
    const {threadId, assistanId = 'XXXXXXXXXXXXXXXXXXXXXXX' } = options;
    const run = await openai.beta.threads.runs.create(threadId,{
        assistant_id: assistanId,
        //instructions; //Ojo sobre escribe al asistente
    });

    console.log({run});
    return run;
}