
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Scale, 
  FileText, 
  Users, 
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useLegalTexts } from '@/hooks/useLegalTexts';
import { useProcedures } from '@/hooks/useProcedures';
import { useUserProgress } from '@/hooks/useProcedures';
import { useAuth } from '@/components/auth/AuthProvider';

interface DashboardProps {
  language: string;
}

export function Dashboard({ language }: DashboardProps) {
  const { user, userRole } = useAuth();
  const { data: legalTexts, isLoading: loadingTexts } = useLegalTexts();
  const { data: procedures, isLoading: loadingProcedures } = useProcedures();
  const { data: userProgress, isLoading: loadingProgress } = useUserProgress();

  const stats = {
    totalTexts: legalTexts?.length || 0,
    totalProcedures: procedures?.length || 0,
    inProgressProcedures: userProgress?.filter(p => p.status === 'en_cours')?.length || 0,
    completedProcedures: userProgress?.filter(p => p.status === 'termine')?.length || 0,
  };

  const recentTexts = legalTexts?.slice(0, 5) || [];
  const recentProcedures = procedures?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenue, {user?.email}
        </h1>
        <p className="text-gray-600">
          Tableau de bord - Journal Officiel de la République Algérienne
        </p>
        <div className="mt-4">
          <Badge variant={userRole === 'admin' ? 'destructive' : userRole === 'juriste' ? 'default' : 'secondary'}>
            {userRole || 'citoyen'}
          </Badge>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Textes juridiques</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTexts}</div>
            <p className="text-xs text-muted-foreground">
              Textes disponibles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Procédures</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProcedures}</div>
            <p className="text-xs text-muted-foreground">
              Procédures administratives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgressProcedures}</div>
            <p className="text-xs text-muted-foreground">
              Procédures en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedProcedures}</div>
            <p className="text-xs text-muted-foreground">
              Procédures terminées
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu récent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Textes juridiques récents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              Textes juridiques récents
            </CardTitle>
            <CardDescription>
              Derniers textes publiés au Journal Officiel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingTexts ? (
              <div className="text-center py-4">Chargement...</div>
            ) : recentTexts.length > 0 ? (
              <div className="space-y-3">
                {recentTexts.map((text) => (
                  <div key={text.id} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-sm">{text.title}</h4>
                    <p className="text-xs text-gray-600">{text.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {text.status}
                      </Badge>
                      {text.journal_date && (
                        <span className="text-xs text-gray-500">
                          {new Date(text.journal_date).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Aucun texte juridique disponible
              </p>
            )}
          </CardContent>
        </Card>

        {/* Procédures récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Procédures récentes
            </CardTitle>
            <CardDescription>
              Dernières procédures administratives
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingProcedures ? (
              <div className="text-center py-4">Chargement...</div>
            ) : recentProcedures.length > 0 ? (
              <div className="space-y-3">
                {recentProcedures.map((procedure) => (
                  <div key={procedure.id} className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-sm">{procedure.title}</h4>
                    <p className="text-xs text-gray-600">{procedure.institution}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {procedure.category}
                      </Badge>
                      {procedure.duration && (
                        <span className="text-xs text-gray-500">
                          {procedure.duration}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Aucune procédure disponible
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Accès rapide aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Scale className="w-6 h-6" />
              <span className="text-sm">Rechercher textes</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="w-6 h-6" />
              <span className="text-sm">Parcourir procédures</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Mes favoris</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Statistiques</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
