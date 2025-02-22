import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_MODEL } from "@/shared/Constants";
import { Conversation } from "@/types/Conversation";
import { AIHandler } from "@/types/AIHandler";
import { AIModel } from "@/types/Model";
import { Content, GenerateContentRequest, GenerativeContentBlob, GoogleGenerativeAI, InlineDataPart, InputContent, Part, TextPart } from "@google/generative-ai";

function fileToInlineDataPart(base64: string, mimeType: string) {
    return {
        inlineData: {
            data: base64,
            mimeType
        } as GenerativeContentBlob,
    };
}

export default async function handler(body: AIHandler, callback: any) {
    try {

        const apiKey = body.apiKey;
        const apiModel = body.model;
        const historyMessages = body.historyMessages.filter((x: any) => ["user", "model"].includes(x.role));
        const message = body.message;
        const hasImages = body.hasImages;
        if (hasImages) {
            return await geminiProVision(apiKey, apiModel, historyMessages, message, callback);
        }

        return await geminiPro(apiKey, apiModel, historyMessages, message, callback);
    } catch (error: any) {
        console.error(error);
        throw new Error(`An error occurred during ping to Gemini. Please refresh your browser and try again.\n ${error.message}`);
    }
}

async function geminiPro(apiKey: string, apiModel: AIModel, historyMessages: Conversation[], message: Conversation, callback: any) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_PRO_MODEL.id });
    const chat = model.startChat({
        history: historyMessages as InputContent[],
    });

    const result = await chat.sendMessageStream(message.parts as string);
    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        callback(text);
    }

    return text;
}

async function geminiProVision(apiKey: string, apiModel: AIModel, historyMessages: Conversation[], message: Conversation, callback: any) {
    const genAI = new GoogleGenerativeAI(apiKey, );
    const model = genAI.getGenerativeModel({ model: GEMINI_PRO_VISION_MODEL.id });
    const parts = historyMessages.map((x: any) => {
        if (x.image) {
            return fileToInlineDataPart(x.image.base64, x.image.mimeType) as InlineDataPart;
        }
        return {
            text: x.parts
        } as TextPart;
    }) as Part[];
    if (message.parts)
        parts.push({
            text: message.parts as string
        });

    const content = {
        parts: parts
    } as Content;
    const contentRequest = {
        contents: [content]
    } as GenerateContentRequest;
    const result = await model.generateContentStream(contentRequest);
    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        callback(text);
    }
    return text;
}
