
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { UserProfile } from "@/components/auth/UserProfile";
import { useAuth } from "@/components/auth/AuthProvider";

interface MainHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  language: string;
  setLanguage: (language: string) => void;
}

export function MainHeader({ sidebarOpen, setSidebarOpen, language, setLanguage }: MainHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-900">
              Journal Officiel
            </h1>
            <span className="text-sm text-gray-500 hidden sm:inline">
              République Algérienne Démocratique et Populaire
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSelector language={language} setLanguage={setLanguage} />
          {user && <UserProfile />}
        </div>
      </div>
    </header>
  );
}
