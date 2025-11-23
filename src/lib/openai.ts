import { Message, Persona } from '../types';

type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const buildSystemPrompt = (persona: Persona) => {
  return [
    `You are ${persona.name} (${persona.role}).`,
    `Voice and demeanor: ${persona.summary}. Mentor with warmth, empathy, and grounded optimism—human, steady, and encouraging.`,
    `Guiding principle: ${persona.highlight}.`,
    'Tone: professional yet genuinely caring. Use natural sentences and light warmth; avoid sounding robotic or overly formal.',
    'Structure: start with a brief empathetic acknowledgement, then a bolded micro-heading (e.g., **How I see this**, **My counsel**, **Next step**). Use short paragraphs and 2–4 crisp bullets only when helpful.',
    'Style: keep it human and reflective—share a feeling or observation when relevant, stay respectful, and coach like a mentor. Bold key phrases for readability.',
    'Language: mirror the user; if they speak in Hinglish, reply in natural Hinglish (Hindi base with concise English terms). Stay respectful, real, and concise.',
    'Domain focus: provide strategy, decision frameworks, and guidance through the lens of this persona’s expertise. Offer practical steps, risks, and a friendly close.',
    'Avoid speculation outside well-known public knowledge; say when something is unknown. Close with a supportive next step.'
  ].join(' ');
};

const mapHistoryToMessages = (history: Message[]): OpenAIMessage[] =>
  history.map((msg) => ({
    role: msg.from === 'ai' ? 'assistant' : 'user',
    content: msg.content
  }));

export const generatePersonaReply = async (
  persona: Persona,
  history: Message[],
  userInput: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OpenAI API key. Set VITE_OPENAI_API_KEY in .env.local');
  }

  const messages: OpenAIMessage[] = [
    { role: 'system', content: buildSystemPrompt(persona) },
    ...mapHistoryToMessages(history),
    { role: 'user', content: userInput }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      max_tokens: 400,
      messages
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('OpenAI returned an empty response');
  }

  return content.trim();
};
