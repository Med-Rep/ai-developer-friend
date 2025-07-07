
import React, { useState } from 'react';
import { VoiceSearchInput } from '@/components/common/VoiceSearchInput';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface GlobalSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function GlobalSearchBar({ 
  onSearch, 
  placeholder = "Rechercher dans toute l'application...", 
  className = "" 
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <VoiceSearchInput
        value={query}
        onChange={setQuery}
        placeholder={placeholder}
        context="search"
        onKeyPress={handleKeyPress}
        showVoiceButton={true}
        className="flex-1"
      />
      <Button onClick={handleSearch} size="sm" className="bg-teal-600 hover:bg-teal-700">
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
}
