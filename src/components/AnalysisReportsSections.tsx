
import React, { useState } from 'react';
import { OptimizedSection } from '@/components/common/OptimizedSection';
import { PersonalizedReportGenerator } from '@/components/reports/PersonalizedReportGenerator';
import { PredefinedReportTemplates } from '@/components/reports/PredefinedReportTemplates';
import { PerformanceAnalysis } from '@/components/analytics/PerformanceAnalysis';
import { ComparativeAnalysis } from '@/components/analytics/ComparativeAnalysis';
import { AIInsightsRecommendations } from '@/components/analytics/AIInsightsRecommendations';
import { AnalyticsDashboardsSection } from '@/components/analytics/AnalyticsDashboardsSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, FileText, TrendingUp } from 'lucide-react';

interface AnalysisReportsSectionsProps {
  section?: string;
  language?: string;
}

export function AnalysisReportsSections({ section, language = 'fr' }: AnalysisReportsSectionsProps) {
  const [activeTab, setActiveTab] = useState('dashboards');

  const reportTabs = [
    {
      id: 'personalized',
      label: 'Rapport Personnalisé',
      icon: FileText,
      content: <PersonalizedReportGenerator />
    },
    {
      id: 'templates',
      label: 'Modèles Prédéfinis',
      icon: FileText,
      content: <PredefinedReportTemplates />
    }
  ];

  const analysisTabs = [
    {
      id: 'performance',
      label: 'Analyse de Performances',
      icon: TrendingUp,
      content: <PerformanceAnalysis />
    },
    {
      id: 'comparative',
      label: 'Analyse Comparative',
      icon: TrendingUp,
      content: <ComparativeAnalysis />
    },
    {
      id: 'ai-insights',
      label: 'Insights IA & Recommandations',
      icon: TrendingUp,
      content: <AIInsightsRecommendations />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyse & Rapports</h1>
        <p className="text-lg text-gray-600">
          Outils d'analyse avancés et génération de rapports personnalisés
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="dashboards" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Tableaux de bord
          </TabsTrigger>
          <TabsTrigger value="analysis" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Analyses
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="w-4 h-4" />
            Rapports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboards" className="mt-8">
          <AnalyticsDashboardsSection language={language} />
        </TabsContent>

        <TabsContent value="analysis" className="mt-8">
          <OptimizedSection
            icon={TrendingUp}
            title="Outils d'Analyse"
            description="Analysez les performances et obtenez des insights IA"
            iconColor="text-green-600"
            searchPlaceholder="Rechercher dans les analyses..."
            searchContext="general"
            tabs={analysisTabs}
          />
        </TabsContent>

        <TabsContent value="reports" className="mt-8">
          <OptimizedSection
            icon={FileText}
            title="Génération de Rapports"
            description="Créez des rapports personnalisés ou utilisez nos modèles prédéfinis"
            iconColor="text-blue-600"
            searchPlaceholder="Rechercher dans les rapports..."
            searchContext="general"
            tabs={reportTabs}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
