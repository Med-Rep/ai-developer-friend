
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Tableau de Bord Analytique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Tableau de bord principal pour les analyses et métriques.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
