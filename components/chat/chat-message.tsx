import ReactMarkdown from 'react-markdown';

import { cn } from '@/lib/utils';

export function ChatMessage({
  role,
  content
}: {
  role: 'user' | 'assistant' | 'system' | 'data';
  content: string;
}) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[88%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm md:max-w-[72%]',
          isUser ? 'bg-primary text-primary-foreground' : 'border bg-card text-card-foreground'
        )}
      >
        <div className="prose-message">
          <ReactMarkdown>{content.replace('[READY_FOR_FEEDBACK]', '')}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
