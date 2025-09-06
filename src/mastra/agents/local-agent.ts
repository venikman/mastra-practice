import { Agent } from '@mastra/core/agent';
import { createOpenAI } from '@ai-sdk/openai';

// LM Studio exposes an OpenAI-compatible API.
// Defaults align with the LM Studio UI hint: http://127.0.0.1:1234 and model "gpt-oss-120b".
const baseURL = process.env.LMSTUDIO_BASE_URL || 'http://127.0.0.1:1234/v1';
const modelId = process.env.LMSTUDIO_MODEL || 'gpt-oss-120b';
// LM Studio accepts any token; using a placeholder keeps the OpenAI client happy.
const apiKey = process.env.LMSTUDIO_API_KEY || 'lm-studio';

const lmstudio = createOpenAI({ baseURL, apiKey });

export const localAgent = new Agent({
  name: 'Local LM Studio Agent',
  instructions:
    'You are a helpful local assistant powered by LM Studio. Keep answers concise and directly useful.',
  model: lmstudio(modelId),
});

