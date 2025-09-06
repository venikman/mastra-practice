import { test, expect } from 'bun:test';
import { mastra } from './index';
import { weatherAgent } from './agents/weather-agent';

test('mastra instance should be created', () => {
  expect(mastra).toBeDefined();
});

test('weatherAgent should respond to a query in an end-to-end test', async () => {
  const response = await weatherAgent.streamVNext([
    {
      role: 'user',
      content: "What's the weather in London?",
    },
  ]);

  let responseText = '';
  // @ts-ignore
  for await (const chunk of response.textStream) {
    responseText += chunk;
  }

  console.log('Agent response:', responseText);

  expect(responseText).toBeInstanceOf(String);
  expect(responseText.length).toBeGreaterThan(0);
}, 30000); // Increase timeout for e2e test
