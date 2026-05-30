import { BookOpenCheck, Brain, CalendarDays, Flame, HeartPulse, Leaf } from 'lucide-react';

export const demoDashboardStats = [
  { icon: Flame, label: 'Current streak', value: '4 days' },
  { icon: CalendarDays, label: 'Sessions this week', value: '3' },
  { icon: Brain, label: 'Top pattern', value: 'Overwhelm' }
];

export const demoQuickStarts = [
  {
    label: 'Something happened',
    href: '/session/new?seed=something-happened',
    prompt: 'Work through a specific moment from today.'
  },
  {
    label: "I'm feeling off",
    href: '/session/new?seed=feeling-off',
    prompt: 'Name the emotion before solving anything.'
  },
  {
    label: 'I want to reflect',
    href: '/session/new?seed=reflect',
    prompt: 'Look for patterns across the day.'
  }
];

export const demoPatterns = [
  { name: 'Overwhelm', frequency: 6, description: 'Often appears around work expectations.' },
  { name: 'Perfectionism', frequency: 4, description: 'Shows up when decisions feel high stakes.' },
  { name: 'Self-criticism', frequency: 3, description: 'Often follows moments of uncertainty.' }
];

export const demoRecentSessions = [
  {
    title: 'Naming Work Overwhelm',
    date: 'Today',
    emotionTags: ['overwhelm', 'anxiety'],
    framework: 'CBT'
  },
  {
    title: 'Boundary With A Friend',
    date: 'Yesterday',
    emotionTags: ['guilt', 'resentment'],
    framework: 'NVC'
  },
  {
    title: 'Slowing The Spiral',
    date: 'May 28',
    emotionTags: ['panic', 'rumination'],
    framework: 'DBT'
  }
];

export const demoExercises = [
  {
    icon: BookOpenCheck,
    name: 'Thought Record',
    framework: 'CBT',
    emotions: ['anxiety', 'anger', 'overwhelm'],
    description: 'Identify an automatic thought, examine evidence, and write a balanced reframe.'
  },
  {
    icon: HeartPulse,
    name: 'STOP Skill',
    framework: 'DBT',
    emotions: ['anger', 'panic', 'overwhelm'],
    description: 'Pause, breathe, observe, and choose the next action before reacting.'
  },
  {
    icon: Leaf,
    name: 'Feelings + Needs Inventory',
    framework: 'NVC',
    emotions: ['sadness', 'resentment', 'disconnection'],
    description: 'Name the feeling and identify the unmet need underneath it.'
  }
];

export const demoEmotionFrequency = [
  { label: 'Anxiety', value: 8 },
  { label: 'Overwhelm', value: 6 },
  { label: 'Guilt', value: 4 },
  { label: 'Anger', value: 3 }
];
