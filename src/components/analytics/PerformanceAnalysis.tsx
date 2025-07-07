
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Download, Brain, BarChart3 } from 'lucide-react';

export function PerformanceAnalysis() {
  const [analysisConfig, setAnalysisConfig] = useState({
    metric: '',
    period: '',
    granularity: 'daily'
  });

  const handleAnalyze = () => {
    console.log('Analyse de performance:', analysisConfig);
  };

  const handleAIInsights = () => {
    console.log('Insights IA pour l\'analyse de performance');
  };

  const handleExport = () => {
    console.log('Export de l\'analyse de performance');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Analyse de Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Métrique</label>
              <Select value={analysisConfig.metric} onValueChange={(value) => setAnalysisConfig(prev => ({ ...prev, metric: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une métrique" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="response-time">Temps de réponse</SelectItem>
                  <SelectItem value="usage">Utilisation</SelectItem>
                  <SelectItem value="errors">Erreurs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Période</label>
              <Select value={analysisConfig.period} onValueChange={(value) => setAnalysisConfig(prev => ({ ...prev, period: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 derniers jours</SelectItem>
                  <SelectItem value="30d">30 derniers jours</SelectItem>
                  <SelectItem value="90d">90 derniers jours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Granularité</label>
              <Select value={analysisConfig.granularity} onValueChange={(value) => setAnalysisConfig(prev => ({ ...prev, granularity: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Horaire</SelectItem>
                  <SelectItem value="daily">Quotidien</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAnalyze} className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analyser
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
