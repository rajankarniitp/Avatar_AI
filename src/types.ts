export type Persona = {
  id: string;
  name: string;
  role: string;
  summary: string;
  image: string;
  highlight: string;
  tags: string[];
};

export type Message = {
  id: string;
  from: 'ai' | 'user';
  content: string;
  timestamp: string;
};
