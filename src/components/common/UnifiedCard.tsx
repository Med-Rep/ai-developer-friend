
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface UnifiedCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'destructive';
    icon?: LucideIcon;
  }>;
  children?: React.ReactNode;
  className?: string;
}

export function UnifiedCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  badge,
  actions = [],
  children,
  className = ""
}: UnifiedCardProps) {
  return (
    <Card className={`transition-all hover:shadow-md ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
          {badge && (
            <Badge variant={badge.variant}>{badge.text}</Badge>
          )}
        </div>
      </CardHeader>
      {(children || actions.length > 0) && (
        <CardContent>
          {children}
          {actions.length > 0 && (
            <div className="flex gap-2 mt-4">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'outline'}
                  size="sm"
                  onClick={action.onClick}
                  className="gap-2"
                >
                  {action.icon && <action.icon className="w-4 h-4" />}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
