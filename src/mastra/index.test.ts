import { test, expect } from 'bun:test';
import { mastra } from './index';
import { weatherAgent } from './agents/weather-agent';

test('mastra instance should be created', () => {
  expect(mastra).toBeDefined();
});

const hasOpenRouterKey = Boolean(process.env.OPENROUTER_API_KEY);

(hasOpenRouterKey ? test : test.skip)(
  'weatherAgent should respond to a query in an end-to-end test',
  async () => {
    const response = await weatherAgent.stream([
      {
        role: 'user',
        content: "What's the weather in London?",
      },
    ]);

    let responseText = '';
    for await (const chunk of response.textStream as AsyncIterable<string>) {
      responseText += chunk;
    }

    console.log('Agent response:', responseText);

    expect(responseText).toBeInstanceOf(String);
    expect(responseText.length).toBeGreaterThan(0);
  },
  30000,
); // Increase timeout for e2e test
