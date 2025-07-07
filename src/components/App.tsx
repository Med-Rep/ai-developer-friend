import React from 'react';
import { SecurityProvider } from '@/components/security/SecurityProvider';
import { EnhancedSecurityWrapper } from '@/components/security/EnhancedSecurityWrapper';
import { UnifiedModalSystem } from '@/components/modals/core/UnifiedModalSystem';
import { Toaster } from '@/components/ui/sonner';
import { MainNavigation } from './MainNavigation';
import { LegalTextsSection } from './LegalTextsSection';
import { ProceduresSection } from './ProceduresSection';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { AdministrationSection } from './AdministrationSection';
import { SearchInterface } from './search/SearchInterface';
import { AnalysisReportsSections } from './AnalysisReportsSections';

function App() {
  const [activeSection, setActiveSection] = React.useState('search');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <SecurityProvider>
      <EnhancedSecurityWrapper sensitiveData={true}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                JuridAI
              </h1>
            </div>
          </header>

          <MainNavigation
            onSectionChange={handleSectionChange}
            activeSection={activeSection}
          />

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {activeSection === 'search' && <SearchInterface />}
              {activeSection === 'legal-texts' && <LegalTextsSection />}
              {activeSection === 'procedures' && <ProceduresSection />}
              {activeSection === 'analytics' && <AnalyticsDashboard />}
              {activeSection === 'analysis-reports' && <AnalysisReportsSections />}
              {activeSection === 'administration' && <AdministrationSection />}
            </div>
          </main>
          
          {/* Système de modales unifié */}
          <UnifiedModalSystem />
          
          {/* Notifications */}
          <Toaster position="bottom-right" />
        </div>
      </EnhancedSecurityWrapper>
    </SecurityProvider>
  );
}

export default App;
