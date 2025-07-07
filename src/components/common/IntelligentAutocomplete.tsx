
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface AutocompleteOption {
  id: string;
  text: string;
  type: 'recent' | 'suggestion' | 'template' | 'legal_term';
  category?: string;
}

interface IntelligentAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function IntelligentAutocomplete({
  value,
  onChange,
  placeholder = "Commencer à taper...",
  context = 'general',
  className = "",
  onKeyPress
}: IntelligentAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AutocompleteOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value.length > 2) {
      // Simuler des suggestions intelligentes basées sur le contexte
      const mockSuggestions: AutocompleteOption[] = [
        { id: '1', text: `${value} - suggestion 1`, type: 'suggestion' },
        { id: '2', text: `${value} - suggestion 2`, type: 'recent' },
        { id: '3', text: `${value} - suggestion 3`, type: 'template' }
      ];
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [value]);

  const handleSuggestionClick = (suggestion: AutocompleteOption) => {
    onChange(suggestion.text);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
        onKeyPress={onKeyPress}
        onFocus={() => value.length > 2 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="text-gray-900">{suggestion.text}</span>
              <span className="ml-2 text-xs text-gray-500">({suggestion.type})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
