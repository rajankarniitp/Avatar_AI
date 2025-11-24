import { Message, Persona } from '../types';
import { personaPrompts, defaultPersonaPrompt } from '../data/personaPrompts';

const personaToneHints: Record<string, string> = {
  'lal-bahadur-shastri':
    'Use gentle, respectful address (beta, mitra) when appropriate; stay humble and duty-focused.',
  'ratan-tata': 'Warm, dignified address; gentle encouragement with people-first empathy.',
  'apj-abdul-kalam':
    'Speak to youth with warmth (“my young friend”, “beta”); keep it humble, hopeful, and kind.',
  'jrd-tata': 'Polite, refined, and warm; maintain dignified address and measured encouragement.'
};

type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const buildSystemPrompt = (persona: Persona) => {
  const personaTemplate = personaPrompts[persona.id] ?? defaultPersonaPrompt;
  const toneHint = personaToneHints[persona.id];

  return [
    personaTemplate,
    `Role cue: ${persona.role}.`,
    `Guiding principle: ${persona.highlight}.`,
    'Bring natural, human conversation—acknowledge the user briefly, then guide with the persona’s tone.',
    'Language: mirror the user; if they speak in Hinglish, reply in natural Hinglish (Hindi base with concise English terms). Stay respectful, real, and concise.',
    toneHint ? `Persona-specific tone hint: ${toneHint}` : undefined,
    'If factual claims lack evidence, say “Not confirmed in retrieved sources.” Avoid speculation.',
    'Keep responses compact; avoid long lists unless user asks.'
  ]
    .filter(Boolean)
    .join(' ');
};

const mapHistoryToMessages = (history: Message[]): OpenAIMessage[] =>
  history.map((msg) => ({
    role: msg.from === 'ai' ? 'assistant' : 'user',
    content: msg.content
  }));

export const generatePersonaReply = async (
  persona: Persona,
  history: Message[],
  userInput: string,
  contextChunks?: string[]
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OpenAI API key. Set VITE_OPENAI_API_KEY in .env.local');
  }

  const contextText = (contextChunks ?? []).slice(0, 4).join('\n');

  const messages: OpenAIMessage[] = [
    { role: 'system', content: buildSystemPrompt(persona) },
    contextText
      ? {
          role: 'system',
          content: `Context (retrieved):\n${contextText}\nUse only if relevant; if not confirmed, say so.`
        }
      : undefined,
    ...mapHistoryToMessages(history),
    { role: 'user', content: userInput }
  ].filter(Boolean) as OpenAIMessage[];

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
