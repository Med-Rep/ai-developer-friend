
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Brain } from 'lucide-react';

export function PersonalizedReportGenerator() {
  const [reportConfig, setReportConfig] = useState({
    title: '',
    description: '',
    period: '',
    sections: [],
    format: 'pdf'
  });

  const handleGenerate = () => {
    console.log('Génération du rapport personnalisé:', reportConfig);
  };

  const handleAIAssist = () => {
    console.log('Assistant IA activé pour la génération de rapport');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Générateur de Rapport Personnalisé
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du rapport</Label>
              <Input
                id="title"
                value={reportConfig.title}
                onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Entrez le titre du rapport"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Période</Label>
              <Select value={reportConfig.period} onValueChange={(value) => setReportConfig(prev => ({ ...prev, period: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="quarterly">Trimestriel</SelectItem>
                  <SelectItem value="yearly">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={reportConfig.description}
              onChange={(e) => setReportConfig(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Décrivez le contenu du rapport"
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAIAssist} variant="outline" className="gap-2">
              <Brain className="w-4 h-4" />
              Assistant IA
            </Button>
            <Button onClick={handleGenerate} className="gap-2">
              <Download className="w-4 h-4" />
              Générer le Rapport
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
