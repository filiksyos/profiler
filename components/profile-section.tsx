'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function ProfileSection({ 
  title, 
  children, 
  defaultOpen = false 
}: ProfileSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="wiki-section">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full wiki-heading text-left group"
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-4 prose dark:prose-invert max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}
