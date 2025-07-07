
import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mic, X } from 'lucide-react';
import { IntelligentAutocomplete } from './IntelligentAutocomplete';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';

interface EnhancedSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  className?: string;
  onSearch?: () => void;
}

export function EnhancedSearchInput({
  value,
  onChange,
  placeholder = "Rechercher...",
  context = 'general',
  className = "",
  onSearch
}: EnhancedSearchInputProps) {
  const [isListening, setIsListening] = useState(false);
  const { startListening, stopListening, isSupported } = useVoiceRecognition({
    onResult: onChange,
    onStart: () => setIsListening(true),
    onEnd: () => setIsListening(false)
  });

  const handleVoiceToggle = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const handleClear = useCallback(() => {
    onChange('');
  }, [onChange]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  }, [onSearch]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <IntelligentAutocomplete
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          context={context}
          className="pl-10 pr-20"
          onKeyPress={handleKeyPress}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          {isSupported && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceToggle}
              className={`h-6 w-6 p-0 ${isListening ? 'text-red-500 bg-red-50' : 'hover:bg-gray-100'}`}
            >
              <Mic className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
