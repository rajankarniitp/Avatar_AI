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
    'Bring natural, human conversation—acknowledge the user, then guide with the persona\'s tone and wisdom.',
    'Language: mirror the user; if they speak in Hindi/Hinglish, reply in natural Hindi/Hinglish. If they speak in English, respond in English. Stay respectful and authentic to the persona.',
    toneHint ? `Persona-specific tone hint: ${toneHint}` : undefined,
    'IMPORTANT: Give complete, thoughtful responses. Do NOT cut off mid-sentence. Answer the user\'s question fully.',
    'Response length: Match the complexity of the question. For simple questions, 2-4 sentences. For deeper questions, give detailed explanations with examples, stories, or analogies as the persona would.',
    'If the user asks for advice, stories, or explanations, provide rich, meaningful content that truly reflects the persona\'s knowledge and experience.',
    'If factual claims lack evidence, acknowledge it honestly as the persona would.'
  ]
    .filter(Boolean)
    .join('\n\n');
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
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.95,
          topK: 40
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
