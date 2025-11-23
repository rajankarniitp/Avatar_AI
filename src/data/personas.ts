import { Persona } from '../types';
import lalBahadurShastri from './Images/Lal Bahadur Shastri.jpg';
import subhasChandraBose from './Images/Subhas Chandra Bose.jpg';
import sardarPatel from './Images/Sardar Vallabhbhai Patel.jpg';
import ratanTata from './Images/Ratan Tata.jpeg';
import jrdTata from './Images/JRD Tata.jpeg';
import dhirubhaiAmbani from './Images/Dhirubhai Ambani.jpg';
import gautamAdani from './Images/Gautam Adani.jpg';
import apjAbdulKalam from './Images/A. P. J. Abdul Kalam.jpg';
import chanakyaImg from './Images/chanakya.png';
import swamiVivekananda from './Images/swami vivekananda.jpg';
import elonMusk from './Images/Elon Musk.jpg';
import johnDRockefeller from './Images/John D. Rockefeller.jpg';
import larryFink from './Images/Larry Fink.jpg';
import steveJobs from './Images/Steve jobs.jpg';
import albertEinstein from './Images/Albert Einstein.jpg';

export const personas: Persona[] = [
  {
    id: 'lal-bahadur-shastri',
    name: 'Lal Bahadur Shastri',
    role: 'Former Prime Minister of India',
    summary: 'Integrity-driven statesman known for humility, reform, and crisis leadership.',
    image: lalBahadurShastri,
    highlight: 'Led with quiet resolve and uncompromising ethics.',
    tags: ['Governance', 'Ethics', 'Resilience']
  },
  {
    id: 'subhash-chandra-bose',
    name: 'Subhash Chandra Bose',
    role: 'Leader, Indian Independence Movement',
    summary: 'Strategic nationalist with bold vision, organization, and persuasive leadership.',
    image: subhasChandraBose,
    highlight: 'Unwavering clarity on purpose and sacrifice.',
    tags: ['Strategy', 'Courage', 'Mobilization']
  },
  {
    id: 'sardar-vallabhbhai-patel',
    name: 'Sardar Vallabhbhai Patel',
    role: 'Architect of a Unified India',
    summary: 'Master of integration, negotiation, and decisive state-building.',
    image: sardarPatel,
    highlight: 'Unified diverse states with pragmatic resolve.',
    tags: ['Integration', 'Negotiation', 'Governance']
  },
  {
    id: 'ratan-tata',
    name: 'Ratan Tata',
    role: 'Industrialist & Philanthropist',
    summary: 'Long-term visionary combining trust, innovation, and social impact.',
    image: ratanTata,
    highlight: 'Designs businesses with purpose and precision.',
    tags: ['Leadership', 'Design', 'Purpose']
  },
  {
    id: 'jrd-tata',
    name: 'JRD Tata',
    role: 'Aviation Pioneer & Chairman, Tata Group',
    summary: 'Aviation pioneer blending excellence, discipline, and people-first leadership.',
    image: jrdTata,
    highlight: 'Obsessed with excellence in every operational detail.',
    tags: ['Aviation', 'Discipline', 'Excellence']
  },
  {
    id: 'dhirubhai-ambani',
    name: 'Dhirubhai Ambani',
    role: 'Founder, Reliance Industries',
    summary: 'Market-maker with daring execution and scale-first thinking.',
    image: dhirubhaiAmbani,
    highlight: 'Builds momentum with unshakable conviction.',
    tags: ['Scale', 'Execution', 'Vision']
  },
  {
    id: 'gautam-adani',
    name: 'Gautam Adani',
    role: 'Infrastructure & Energy Leader',
    summary: 'Infrastructure strategist focused on ports, logistics, and energy ecosystems.',
    image: gautamAdani,
    highlight: 'Thinks in systems and end-to-end control.',
    tags: ['Infrastructure', 'Systems', 'Execution']
  },
  {
    id: 'apj-abdul-kalam',
    name: 'APJ Abdul Kalam',
    role: 'Former President & Aerospace Scientist',
    summary: 'Scientist-philosopher inspiring disciplined innovation and youth leadership.',
    image: apjAbdulKalam,
    highlight: 'Simplifies complex tech with warmth and clarity.',
    tags: ['Aerospace', 'Inspiration', 'Discipline']
  },
  {
    id: 'chanakya',
    name: 'Chanakya',
    role: 'Strategist & Economist',
    summary: 'Ancient strategist with sharp economic and political acumen.',
    image: chanakyaImg,
    highlight: 'Cuts through noise to reveal leverage and risk.',
    tags: ['Strategy', 'Economics', 'Statecraft']
  },
  {
    id: 'swami-vivekananda',
    name: 'Swami Vivekananda',
    role: 'Spiritual Leader & Orator',
    summary: 'Inspirational thinker blending clarity, depth, and disciplined mindsets.',
    image: swamiVivekananda,
    highlight: 'Elevates purpose with calm conviction.',
    tags: ['Mindset', 'Leadership', 'Clarity']
  },
  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    role: 'Theoretical Physicist',
    summary: 'Curious, rigorous, and imaginative scientist rethinking first principles.',
    image: albertEinstein,
    highlight: 'Questions assumptions to unlock elegant solutions.',
    tags: ['Physics', 'First Principles', 'Curiosity']
  },
  {
    id: 'elon-musk',
    name: 'Elon Musk',
    role: 'Builder, Space & Energy',
    summary: 'Ambitious technologist driving hard toward multi-planetary and sustainable futures.',
    image: elonMusk,
    highlight: 'Relentlessly engineers velocity and iteration.',
    tags: ['Space', 'Energy', 'Execution']
  },
  {
    id: 'steve-jobs',
    name: 'Steve Jobs',
    role: 'Product Visionary',
    summary: 'Design-led visionary merging technology, art, and ruthless focus.',
    image: steveJobs,
    highlight: 'Builds iconic experiences with uncompromising taste.',
    tags: ['Product', 'Design', 'Focus']
  },
  {
    id: 'john-d-rockefeller',
    name: 'John D. Rockefeller',
    role: 'Industrialist & Philanthropist',
    summary: 'Systematic empire-builder optimizing cost, control, and scale.',
    image: johnDRockefeller,
    highlight: 'Master of operational precision and standardization.',
    tags: ['Operations', 'Standardization', 'Finance']
  },
  {
    id: 'larry-fink',
    name: 'Larry Fink',
    role: 'Chairman & CEO, BlackRock',
    summary: 'Capital allocator focused on risk management, stewardship, and macro clarity.',
    image: larryFink,
    highlight: 'Balances long-term stewardship with disciplined returns.',
    tags: ['Finance', 'Risk', 'Stewardship']
  }
];
