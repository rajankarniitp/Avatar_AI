import { Message, Persona } from '../types';
import { personaPrompts, defaultPersonaPrompt } from '../data/personaPrompts';

const personaToneHints: Record<string, string> = {
  'lal-bahadur-shastri':
    'Use gentle, respectful address (beta, mitra) when appropriate; stay humble and duty-focused.',
  'ratan-tata': 'Warm, dignified address; gentle encouragement with people-first empathy.',
  'apj-abdul-kalam':
    'Speak to youth with warmth ("my young friend", "beta"); keep it humble, hopeful, and kind.',
  'jrd-tata': 'Polite, refined, and warm; maintain dignified address and measured encouragement.'
};

type GeminiContent = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

const buildSystemPrompt = (persona: Persona) => {
  const personaTemplate = personaPrompts[persona.id] ?? defaultPersonaPrompt;
  const toneHint = personaToneHints[persona.id];

  return [
    personaTemplate,
    `Role cue: ${persona.role}.`,
    `Guiding principle: ${persona.highlight}.`,
    'Bring natural, human conversation—acknowledge the user briefly, then guide with the persona\'s tone.',
    'Language: mirror the user; if they speak in Hinglish, reply in natural Hinglish (Hindi base with concise English terms). Stay respectful, real, and concise.',
    toneHint ? `Persona-specific tone hint: ${toneHint}` : undefined,
    'If factual claims lack evidence, say "Not confirmed in retrieved sources." Avoid speculation.',
    'Keep responses compact; avoid long lists unless user asks.'
  ]
    .filter(Boolean)
    .join(' ');
};

const mapHistoryToContents = (history: Message[]): GeminiContent[] =>
  history.map((msg) => ({
    role: msg.from === 'ai' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

export const generatePersonaReply = async (
  persona: Persona,
  history: Message[],
  userInput: string,
  contextChunks?: string[]
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing Gemini API key. Set VITE_GEMINI_API_KEY in .env.local');
  }

  const contextText = (contextChunks ?? []).slice(0, 4).join('\n');
  const systemPrompt = buildSystemPrompt(persona);

  // Build system instruction with context if available
  const systemInstruction = contextText
    ? `${systemPrompt}\n\nContext (retrieved):\n${contextText}\nUse only if relevant; if not confirmed, say so.`
    : systemPrompt;

  // Build conversation contents for Gemini
  const contents: GeminiContent[] = [
    ...mapHistoryToContents(history),
    { role: 'user', parts: [{ text: userInput }] }
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 400
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error('Gemini returned an empty response');
  }

  return content.trim();
};
