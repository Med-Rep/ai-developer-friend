
import React from 'react';
import { BaseModal } from './core/BaseModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitCompare } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
}

export function ComparisonModal({ isOpen, onClose, items }: ComparisonModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Comparaison de documents"
      size="xl"
    >
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <GitCompare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Aucun élément à comparer</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {item.title || `Document ${index + 1}`}
                    <Badge variant="outline">{item.type || 'Document'}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description || 'Aucune description disponible'}
                  </p>
                  <div className="text-xs text-gray-500">
                    Dernière modification: {item.lastModified || 'Inconnue'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </BaseModal>
  );
}
