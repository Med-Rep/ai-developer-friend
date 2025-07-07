
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export function AdministrationSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Administration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Section d'administration et de gestion du système.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
