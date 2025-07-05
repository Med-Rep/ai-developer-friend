
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { testAccounts } from '@/utils/testAccounts';
import { User, Lock, Shield } from 'lucide-react';

export function TestAccountsInfo() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4" />
          Comptes de test disponibles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {testAccounts.map((account, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-600" />
              <div>
                <p className="font-medium text-sm">{account.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Lock className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">{account.password}</span>
                </div>
              </div>
            </div>
            <Badge
              variant={
                account.role === 'admin' ? 'destructive' : 
                account.role === 'juriste' ? 'default' : 
                'secondary'
              }
            >
              {account.role}
            </Badge>
          </div>
        ))}
        <p className="text-xs text-gray-500 mt-3">
          Ces comptes permettent de tester l'application avec différents niveaux d'accès.
        </p>
      </CardContent>
    </Card>
  );
}
