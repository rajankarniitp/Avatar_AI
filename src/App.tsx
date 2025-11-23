import { useMemo, useState } from 'react';
import LayoutShell from './components/LayoutShell';
import TopNavigation from './components/TopNavigation';
import FooterBar from './components/FooterBar';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import AboutPage from './pages/AboutPage';
import { personas } from './data/personas';
import { Message, Persona } from './types';
import { generatePersonaReply } from './lib/openai';

type View = 'home' | 'chat' | 'about';

const App = () => {
  const [view, setView] = useState<View>('home');
  const [selectedPersona, setSelectedPersona] = useState<Persona | undefined>(personas[0]);
  const [messagesByPersona, setMessagesByPersona] = useState<Record<string, Message[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const personaMap = useMemo(
    () => Object.fromEntries(personas.map((persona) => [persona.id, persona])),
    []
  );

  const currentMessages = selectedPersona ? messagesByPersona[selectedPersona.id] ?? [] : [];

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setMessagesByPersona((prev) => ({
      ...prev,
      [persona.id]: prev[persona.id] ?? []
    }));
    setView('chat');
  };

  const handleSend = async (content: string) => {
    if (!selectedPersona) return;
    const personaId = selectedPersona.id;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      from: 'user',
      content,
      timestamp
    };
    const historyWithUser = [...(messagesByPersona[personaId] ?? []), userMessage];
    setMessagesByPersona((prev) => ({ ...prev, [personaId]: historyWithUser }));
    setIsLoading(true);

    try {
      const aiContent = await generatePersonaReply(selectedPersona, historyWithUser, content);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        from: 'ai',
        content: aiContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessagesByPersona((prev) => ({
        ...prev,
        [personaId]: [...(prev[personaId] ?? []), aiMessage]
      }));
    } catch (error) {
      const fallback: Message = {
        id: `ai-${Date.now()}`,
        from: 'ai',
        content:
          'I could not reach the model right now. Verify your OpenAI key and network, then try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessagesByPersona((prev) => ({
        ...prev,
        [personaId]: [...(prev[personaId] ?? []), fallback]
      }));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    if (!selectedPersona) return;
    setMessagesByPersona((prev) => ({ ...prev, [selectedPersona.id]: [] }));
  };

  const handleRegenerate = async () => {
    if (!selectedPersona) return;
    const personaId = selectedPersona.id;
    const personaHistory = messagesByPersona[personaId] ?? [];
    const lastUser = [...personaHistory].reverse().find((m) => m.from === 'user')?.content;
    const regeneratePrompt =
      lastUser ?? 'Revisit the previous topic and offer a fresh, concise perspective as a mentor.';
    setIsLoading(true);
    try {
      const aiContent = await generatePersonaReply(selectedPersona, personaHistory, regeneratePrompt);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        from: 'ai',
        content: aiContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessagesByPersona((prev) => ({
        ...prev,
        [personaId]: [...(prev[personaId] ?? []), aiMessage]
      }));
    } catch (error) {
      const fallback: Message = {
        id: `ai-${Date.now()}`,
        from: 'ai',
        content: 'Unable to regenerate right now. Check OpenAI connectivity and retry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessagesByPersona((prev) => ({
        ...prev,
        [personaId]: [...(prev[personaId] ?? []), fallback]
      }));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = (path: string) => {
    if (path === 'about' || path === 'safety') {
      setView('about');
    } else {
      setView('home');
    }
  };

  return (
    <LayoutShell>
      <TopNavigation onNavigate={navigate} />
      {view === 'home' && (
        <Home onSelectPersona={handleSelectPersona} activePersonaId={selectedPersona?.id} />
      )}
      {view === 'chat' && selectedPersona && (
        <ChatPage
          persona={personaMap[selectedPersona.id]}
          messages={currentMessages}
          onSend={handleSend}
          onClear={handleClear}
          onRegenerate={handleRegenerate}
          isLoading={isLoading}
          onBack={() => setView('home')}
        />
      )}
      {view === 'about' && <AboutPage />}
      <FooterBar />
    </LayoutShell>
  );
};

export default App;
