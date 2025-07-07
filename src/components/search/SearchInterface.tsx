
import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedSearchInput } from '@/components/common/EnhancedSearchInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, BookOpen, FileText } from 'lucide-react';
import { useOptimizedSearch } from '@/hooks/useOptimizedSearch';

interface SearchInterfaceProps {
  onSearch?: (query: string, filters?: any) => void;
  placeholder?: string;
  context?: 'search' | 'legal' | 'procedure' | 'general';
}

export function SearchInterface({ 
  onSearch, 
  placeholder = "Rechercher dans la base de données...",
  context = 'search'
}: SearchInterfaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { results, isLoading, search } = useOptimizedSearch();

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      search(searchQuery, { filters: activeFilters });
      onSearch?.(searchQuery, { filters: activeFilters });
    }
  }, [searchQuery, activeFilters, search, onSearch]);

  const recentSearches = useMemo(() => [
    "Droit du travail",
    "Code civil",
    "Procédure administrative",
    "Jurisprudence constitutionnelle"
  ], []);

  const popularQueries = useMemo(() => [
    { query: "Divorce", count: 1247, type: "Droit civil" },
    { query: "Contrat de travail", count: 892, type: "Droit du travail" },
    { query: "Permis de construire", count: 654, type: "Droit administratif" },
    { query: "Société commerciale", count: 423, type: "Droit commercial" }
  ], []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Recherche Avancée
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <EnhancedSearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={placeholder}
                context={context}
                onSearch={handleSearch}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="w-4 h-4 mr-2" />
              Rechercher
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
            </Button>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex gap-2">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {filter}
                  <button onClick={() => setActiveFilters(prev => prev.filter(f => f !== filter))}>
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recherches Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentSearches.map((searchItem, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(searchItem)}
                  className="w-full text-left p-2 hover:bg-gray-50 rounded-md text-sm"
                >
                  {searchItem}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recherches Populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularQueries.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => setSearchQuery(item.query)}
                >
                  <div>
                    <p className="font-medium text-sm">{item.query}</p>
                    <p className="text-xs text-gray-600">{item.type}</p>
                  </div>
                  <Badge variant="outline">{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Résultats ({results.length})</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary">{result.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{result.excerpt}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {result.type === 'legal' ? <BookOpen className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                          {result.type === 'legal' ? 'Texte juridique' : 'Procédure'}
                        </span>
                        <span>{result.date}</span>
                      </div>
                    </div>
                    <Badge variant={result.type === 'legal' ? 'default' : 'secondary'}>
                      {result.domain}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
