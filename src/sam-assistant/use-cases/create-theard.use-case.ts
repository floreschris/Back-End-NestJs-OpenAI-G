
//https://platform.openai.com/docs/assistants/overview

import OpenAI from "openai";

export const createTheadUseCase = async (openai: OpenAI) => {

    const { id } = await openai.beta.threads.create();
    return { id };


}