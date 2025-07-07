import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Menu, User, Settings, LogOut, Search } from 'lucide-react';
import { GlobalSearchBar } from './GlobalSearchBar';

interface MainHeaderProps {
  language: string;
  activeSection: string;
  onLanguageChange: (language: string) => void;
  onSectionChange: (section: string) => void;
}

export function MainHeader({ language, activeSection, onLanguageChange, onSectionChange }: MainHeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleGlobalSearch = (query: string) => {
    console.log('Recherche globale:', query);
    // Rediriger vers la page de recherche avec la requête
    onSectionChange('advanced-search');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JA</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  Juridique Algérien
                </h1>
                <p className="text-xs text-gray-600">
                  Plateforme Officielle
                </p>
              </div>
            </div>
          </div>

          {/* Barre de recherche globale */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <GlobalSearchBar
              onSearch={handleGlobalSearch}
              placeholder="Rechercher textes juridiques, procédures..."
              className="w-full"
            />
          </div>

          {/* Actions et menu utilisateur */}
          <div className="flex items-center space-x-3">
            {/* Recherche mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => onSectionChange('advanced-search')}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5" />
              <Badge
                variant="secondary"
                className="absolute top-1 right-1 rounded-full px-1 py-0.5 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* Menu utilisateur */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User className="w-5 h-5" />
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setShowUserMenu(false);
                      onSectionChange('user-management');
                    }}
                  >
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setShowUserMenu(false);
                      // Déconnexion simulée
                      alert('Déconnexion réussie!');
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </a>
                </div>
              )}
            </div>

            {/* Menu mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Menu mobile de recherche */}
        <div className="md:hidden border-t border-gray-100 py-3">
          <GlobalSearchBar
            onSearch={handleGlobalSearch}
            placeholder="Rechercher..."
            className="w-full"
          />
        </div>
      </div>
    </header>
  );
}
