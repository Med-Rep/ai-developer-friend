
import React, { useState } from 'react';
import { OptimizedSection } from '@/components/common/OptimizedSection';
import { PersonalizedReportGenerator } from '@/components/reports/PersonalizedReportGenerator';
import { PredefinedReportTemplates } from '@/components/reports/PredefinedReportTemplates';
import { PerformanceAnalysis } from '@/components/analytics/PerformanceAnalysis';
import { ComparativeAnalysis } from '@/components/analytics/ComparativeAnalysis';
import { AIInsightsRecommendations } from '@/components/analytics/AIInsightsRecommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Brain, TrendingUp, GitCompare, Plus, Eye, PieChart, Users, Activity } from 'lucide-react';

interface AnalysisReportsSectionsProps {
  section?: string;
  language?: string;
}

// Dashboard Components
const DashboardOverview = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Button className="gap-2 bg-emerald-500 hover:bg-emerald-600">
        Vue d'ensemble
      </Button>
      <Button variant="outline" className="gap-2">
        Tableaux Personnalisés
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 text-center">
          <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold">24</div>
          <div className="text-sm text-gray-600">Tableaux actifs</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <FileText className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-gray-600">Rapports générés</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <Activity className="w-8 h-8 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold">8</div>
          <div className="text-sm text-gray-600">Analyses en cours</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <Users className="w-8 h-8 mx-auto mb-2 text-orange-600" />
          <div className="text-2xl font-bold">47</div>
          <div className="text-sm text-gray-600">Utilisateurs actifs</div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tableaux de Bord Disponibles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">Tableau Principal</div>
                <div className="text-sm text-gray-600">Vue d'ensemble générale</div>
              </div>
            </div>
            <Button size="sm">Ouvrir</Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <PieChart className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium">Statistiques d'Usage</div>
                <div className="text-sm text-gray-600">Métriques d'utilisation</div>
              </div>
            </div>
            <Button size="sm">Ouvrir</Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-medium">Tendances Temporelles</div>
                <div className="text-sm text-gray-600">Évolution dans le temps</div>
              </div>
            </div>
            <Button size="sm">Ouvrir</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rapports Récents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Rapport mensuel d'activité - Décembre 2024</div>
              <div className="text-sm text-gray-600">Il y a 2 heures • 2.4 MB</div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Terminé</span>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Analyse des tendances législatives Q4 2024</div>
              <div className="text-sm text-gray-600">Il y a 1 jour • 5.1 MB</div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Terminé</span>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <div className="font-medium">Performance des recherches - Novembre 2024</div>
              <div className="text-sm text-gray-600">Il y a 3 jours • 1.8 MB</div>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">En cours</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const PersonalizedDashboards = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Tableaux de Bord Personnalisés</h3>
      <Button className="gap-2">
        <Plus className="w-4 h-4" />
        Nouveau Tableau de Bord
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-4">
        <Button className="w-full gap-2 bg-emerald-500 hover:bg-emerald-600">
          Mes Tableaux de Bord
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Mon Tableau de Bord Principal ⭐
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Vue d'ensemble de mes activités juridiques quotidiennes</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Modifié :</span>
                <span>Il y a 2 heures</span>
              </div>
              <div className="flex justify-between">
                <span>Vues :</span>
                <span>156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full gap-2">
          Modèles
        </Button>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h4 className="font-medium mb-2">Tableau de Bord Juridique</h4>
              <p className="text-sm text-gray-600 mb-4">Modèle complet pour le suivi des activités juridiques</p>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Utiliser ce modèle
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <PieChart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h4 className="font-medium mb-2">Analyse de Performance</h4>
              <p className="text-sm text-gray-600 mb-4">Suivi des métriques et KPIs de votre équipe</p>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Utiliser ce modèle
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full gap-2">
          Partagés
        </Button>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 text-gray-400 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <h4 className="font-medium mb-2">Aucun tableau de bord partagé</h4>
            <p className="text-sm text-gray-600 mb-4">Les tableaux de bord partagés par vos collègues apparaîtront ici</p>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Demander l'accès
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const UsageMetrics = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Métriques d'Utilisation des Documents</h3>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Filtres</Button>
        <Button variant="outline" size="sm">Période</Button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Vues totales</span>
          </div>
          <div className="text-2xl font-bold">45,234</div>
          <div className="text-sm text-green-600">↑ +12%</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">Téléchargements</span>
          </div>
          <div className="text-2xl font-bold">8,967</div>
          <div className="text-sm text-green-600">↑ +8%</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">Partages</span>
          </div>
          <div className="text-2xl font-bold">1,234</div>
          <div className="text-sm text-green-600">↑ +25%</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium">Documents actifs</span>
          </div>
          <div className="text-2xl font-bold">567</div>
          <div className="text-sm text-green-600">↑ +3%</div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Activité Récente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <div className="font-medium">Code du travail - Article 87-95</div>
              <div className="text-sm text-gray-600">Droit du travail</div>
            </div>
            <div className="text-right text-sm">
              <div>1247 vues</div>
              <div className="text-gray-500">Il y a 2 heures</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <FileText className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <div className="font-medium">Loi de finances 2025</div>
              <div className="text-sm text-gray-600">Finances publiques</div>
            </div>
            <div className="text-right text-sm">
              <div>1156 vues</div>
              <div className="text-gray-500">Il y a 1 heure</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-lg">
            <FileText className="w-5 h-5 text-purple-600" />
            <div className="flex-1">
              <div className="font-medium">Décret d'application - Procédures administratives</div>
              <div className="text-sm text-gray-600">Droit administratif</div>
            </div>
            <div className="text-right text-sm">
              <div>892 vues</div>
              <div className="text-gray-500">Il y a 4 heures</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Utilisateurs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Temps moyen de lecture</span>
            <span className="font-medium">4m 32s <span className="text-green-600 text-sm">↑ +15%</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Taux de rebond</span>
            <span className="font-medium">23% <span className="text-red-600 text-sm">↑ -8%</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Pages par session</span>
            <span className="font-medium">3.2 <span className="text-green-600 text-sm">↑ +12%</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Utilisateurs récurrents</span>
            <span className="font-medium">78% <span className="text-green-600 text-sm">↑ +5%</span></span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export function AnalysisReportsSections({ section, language = 'fr' }: AnalysisReportsSectionsProps) {
  const [activeMainTab, setActiveMainTab] = useState('dashboards');
  const [activeDashboardTab, setActiveDashboardTab] = useState('overview');
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('performance');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyse & Rapports</h1>
        <p className="text-lg text-gray-600">
          Outils d'analyse avancés et génération de rapports personnalisés
        </p>
      </div>

      <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Tableaux de bord
              </CardTitle>
              <p className="text-sm text-gray-600">
                Visualisez vos données avec des tableaux de bord interactifs et personnalisables
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeDashboardTab} onValueChange={setActiveDashboardTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-6">
                  <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                  <TabsTrigger value="personalized">Tableaux Personnalisés</TabsTrigger>
                  <TabsTrigger value="usage">Métriques d'utilisation</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <DashboardOverview />
                </TabsContent>

                <TabsContent value="personalized">
                  <PersonalizedDashboards />
                </TabsContent>

                <TabsContent value="usage">
                  <UsageMetrics />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Analyses
              </CardTitle>
              <p className="text-sm text-gray-600">
                Outils d'analyse avancés pour examiner les tendances et les métriques
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeAnalysisTab} onValueChange={setActiveAnalysisTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto mb-6">
                  <TabsTrigger value="performance" className="gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Analyse de Performance
                  </TabsTrigger>
                  <TabsTrigger value="comparative" className="gap-2">
                    <GitCompare className="w-4 h-4" />
                    Analyse Comparative
                  </TabsTrigger>
                  <TabsTrigger value="ai-insights" className="gap-2">
                    <Brain className="w-4 h-4" />
                    Insights IA et Recommandations
                  </TabsTrigger>
                  <TabsTrigger value="usage-metrics" className="gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Métriques d'utilisation
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="performance">
                  <PerformanceAnalysis />
                </TabsContent>

                <TabsContent value="comparative">
                  <ComparativeAnalysis />
                </TabsContent>

                <TabsContent value="ai-insights">
                  <AIInsightsRecommendations />
                </TabsContent>

                <TabsContent value="usage-metrics">
                  <UsageMetrics />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Rapports
              </CardTitle>
              <p className="text-sm text-gray-600">
                Créez des rapports personnalisés ou utilisez nos modèles prédéfinis
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personalized" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
                  <TabsTrigger value="personalized" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Rapport Personnalisé
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Modèles Prédéfinis
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personalized">
                  <PersonalizedReportGenerator />
                </TabsContent>

                <TabsContent value="templates">
                  <PredefinedReportTemplates />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
