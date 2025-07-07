
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Brain } from 'lucide-react';

export function PredefinedReportTemplates() {
  const templates = [
    {
      id: 1,
      title: 'Rapport d\'Activité Mensuel',
      description: 'Synthèse des activités du mois',
      category: 'Activité'
    },
    {
      id: 2,
      title: 'Analyse de Performance',
      description: 'Analyse des performances système',
      category: 'Performance'
    },
    {
      id: 3,
      title: 'Rapport de Conformité',
      description: 'Vérification de la conformité réglementaire',
      category: 'Conformité'
    }
  ];

  const handleGenerate = (templateId: number) => {
    console.log('Génération du rapport prédéfini:', templateId);
  };

  const handleAIAssist = (templateId: number) => {
    console.log('Assistant IA pour le modèle:', templateId);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-green-600" />
                {template.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{template.description}</p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleAIAssist(template.id)} 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                >
                  <Brain className="w-4 h-4" />
                  IA
                </Button>
                <Button 
                  onClick={() => handleGenerate(template.id)} 
                  size="sm" 
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  Générer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
