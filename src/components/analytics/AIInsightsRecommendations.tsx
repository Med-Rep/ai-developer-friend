
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Download, Lightbulb, TrendingUp } from 'lucide-react';

export function AIInsightsRecommendations() {
  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'trend',
      title: 'Tendance émergente détectée',
      description: 'Augmentation de 25% des recherches sur les procédures fiscales',
      recommendation: 'Considérer l\'ajout de contenu spécialisé en fiscalité',
      confidence: 85
    },
    {
      id: 2,
      type: 'optimization',
      title: 'Opportunité d\'optimisation',
      description: 'Les utilisateurs abandonnent souvent à l\'étape 3 des procédures',
      recommendation: 'Simplifier le processus et ajouter plus d\'aide contextuelle',
      confidence: 92
    }
  ]);

  const handleGenerateInsights = () => {
    console.log('Génération d\'insights IA');
  };

  const handleExport = () => {
    console.log('Export des insights et recommandations');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            Insights IA & Recommandations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button onClick={handleGenerateInsights} className="gap-2">
              <Brain className="w-4 h-4" />
              Générer des Insights
            </Button>
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exporter
            </Button>
          </div>

          <div className="space-y-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-indigo-500">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {insight.type === 'trend' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                      )}
                      {insight.title}
                    </CardTitle>
                    <span className="text-sm text-gray-500">
                      Confiance: {insight.confidence}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">{insight.description}</p>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-blue-900 mb-1">Recommandation:</h4>
                    <p className="text-blue-800">{insight.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
