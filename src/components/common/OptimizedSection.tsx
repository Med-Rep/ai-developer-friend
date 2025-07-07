
import React, { memo } from 'react';
import { UnifiedSectionHeader } from './UnifiedSectionHeader';
import { EnhancedSearchInput } from './EnhancedSearchInput';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, RefreshCw } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TabConfig {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: React.ReactNode;
  count?: number;
}

interface OptimizedSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  searchPlaceholder?: string;
  searchContext?: 'search' | 'legal' | 'procedure' | 'general';
  onSearch?: (query: string) => void;
  onAdd?: () => void;
  onRefresh?: () => void;
  tabs: TabConfig[];
  defaultTab?: string;
  addButtonLabel?: string;
}

export const OptimizedSection = memo(function OptimizedSection({
  icon,
  title,
  description,
  iconColor,
  searchPlaceholder,
  searchContext = 'general',
  onSearch,
  onAdd,
  onRefresh,
  tabs,
  defaultTab,
  addButtonLabel = "Nouveau"
}: OptimizedSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  }, [onSearch]);

  return (
    <div className="space-y-6">
      <UnifiedSectionHeader
        icon={icon}
        title={title}
        description={description}
        iconColor={iconColor}
      />

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <EnhancedSearchInput
                value={searchQuery}
                onChange={handleSearch}
                placeholder={searchPlaceholder}
                context={searchContext}
              />
            </div>
            <div className="flex gap-2">
              {onRefresh && (
                <Button variant="outline" onClick={onRefresh}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              )}
              {onAdd && (
                <Button onClick={onAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  {addButtonLabel}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={defaultTab || tabs[0]?.id} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
});
