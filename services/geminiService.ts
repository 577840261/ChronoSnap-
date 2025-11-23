import { GoogleGenAI } from "@google/genai";
import { MODEL_NAMES } from '../constants';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("环境变量中未找到 API 密钥");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Helper to parse base64 string and extract mimeType and data.
 */
const parseBase64 = (base64String: string) => {
  // Check if string has data URI scheme
  const match = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  
  if (match) {
    return {
      mimeType: match[1],
      data: match[2]
    };
  }
  
  // Fallback if no prefix is present (assumes the string is just the data)
  // Defaulting to jpeg if unknown, but usually this shouldn't happen with FileReader/Canvas
  return {
    mimeType: 'image/jpeg',
    data: base64String
  };
};

/**
 * Generates a "Time Travel" version of the user's photo.
 */
export const generateTimeTravelImage = async (
  imageBase64: string,
  promptModifier: string
): Promise<string> => {
  const ai = getClient();
  const { mimeType, data } = parseBase64(imageBase64);

  const prompt = `Edit this image to transform the person into a character ${promptModifier}. 
  Maintain the person's facial identity, pose, and composition as much as possible, but completely change the clothing, hair style (if applicable to the era), and background to match the description. 
  The result should be a high-quality, photorealistic image.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAMES.EDITING,
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: prompt }
        ]
      }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content?.parts;
      if (parts) {
        // First look for image
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
        // If no image, check for text (refusal/error message from model)
        const textPart = parts.find(p => p.text);
        if (textPart && textPart.text) {
          throw new Error(`AI 无法生成图像: ${textPart.text}`);
        }
      }
    }
    
    throw new Error("未生成图像。API 返回了空内容。");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "生成图像时发生未知错误");
  }
};

/**
 * Edits the image based on a user prompt using Gemini 2.5 Flash Image.
 */
export const editImageWithPrompt = async (
  imageBase64: string,
  userPrompt: string
): Promise<string> => {
  const ai = getClient();
  const { mimeType, data } = parseBase64(imageBase64);

  // System instruction to ensure high quality edits
  const prompt = `Edit this image based on the following instruction: "${userPrompt}". 
  Maintain the overall composition and identity unless instructed otherwise. 
  Output a high-quality image.`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAMES.EDITING,
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: prompt }
        ]
      }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData && part.inlineData.data) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
        
        const textPart = parts.find(p => p.text);
        if (textPart && textPart.text) {
          throw new Error(`AI 无法生成图像: ${textPart.text}`);
        }
      }
    }
    
    throw new Error("未生成图像。API 返回了空内容。");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "生成图像时发生未知错误");
  }
};

/**
 * Analyzes the image using Gemini 3 Pro Preview.
 */
export const analyzeImage = async (
  imageBase64: string,
  userPrompt: string
): Promise<string> => {
  const ai = getClient();
  const { mimeType, data } = parseBase64(imageBase64);

  // Ensure the prompt requests Chinese output
  const basePrompt = userPrompt && userPrompt.trim() !== '' 
    ? userPrompt 
    : "详细描述这张图片。识别关键元素、风格和背景。";
    
  const fullPrompt = `${basePrompt} 请用中文回答。请不要使用Markdown格式（如##或**），直接输出纯文本。`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAMES.ANALYSIS,
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: fullPrompt }
        ]
      }
    });

    return response.text || "无法分析该图片。";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "分析图像时发生错误");
  }
};
