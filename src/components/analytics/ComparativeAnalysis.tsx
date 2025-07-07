
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GitCompare, Download, Brain, Plus } from 'lucide-react';

export function ComparativeAnalysis() {
  const [comparisonConfig, setComparisonConfig] = useState({
    baseline: '',
    comparison: '',
    metrics: []
  });

  const handleCompare = () => {
    console.log('Analyse comparative:', comparisonConfig);
  };

  const handleAIInsights = () => {
    console.log('Insights IA pour l\'analyse comparative');
  };

  const handleExport = () => {
    console.log('Export de l\'analyse comparative');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-purple-600" />
            Analyse Comparative
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Référence de base</label>
              <Select value={comparisonConfig.baseline} onValueChange={(value) => setComparisonConfig(prev => ({ ...prev, baseline: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la référence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Mois actuel</SelectItem>
                  <SelectItem value="previous-month">Mois précédent</SelectItem>
                  <SelectItem value="same-month-last-year">Même mois année dernière</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Élément de comparaison</label>
              <Select value={comparisonConfig.comparison} onValueChange={(value) => setComparisonConfig(prev => ({ ...prev, comparison: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner l'élément" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="previous-period">Période précédente</SelectItem>
                  <SelectItem value="benchmark">Benchmark secteur</SelectItem>
                  <SelectItem value="target">Objectif fixé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Métriques à comparer</label>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une métrique
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCompare} className="gap-2">
              <GitCompare className="w-4 h-4" />
              Comparer
            </Button>
            <Button onClick={handleAIInsights} variant="outline" className="gap-2">
              <Brain className="w-4 h-4" />
              Insights IA
            </Button>
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
