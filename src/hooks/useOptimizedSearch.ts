
import { useState, useCallback } from 'react';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: 'legal' | 'procedure';
  domain: string;
  date: string;
}

interface SearchOptions {
  filters?: string[];
}

interface UseOptimizedSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isLoading: boolean;
  error: string;
  search: (searchQuery: string, options?: SearchOptions) => void;
  clearResults: () => void;
}

export function useOptimizedSearch(): UseOptimizedSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const search = useCallback((searchQuery: string, options?: SearchOptions) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError('');

    // Simulation d'une recherche
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: `Résultat pour "${searchQuery}"`,
          excerpt: 'Extrait du document correspondant à votre recherche...',
          type: 'legal',
          domain: 'Droit civil',
          date: '2024-01-15'
        },
        {
          id: '2',
          title: `Procédure liée à "${searchQuery}"`,
          excerpt: 'Description de la procédure administrative...',
          type: 'procedure',
          domain: 'Administration',
          date: '2024-01-10'
        }
      ];

      setResults(mockResults);
      setIsLoading(false);
    }, 1000);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery('');
    setError('');
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    search,
    clearResults
  };
}
