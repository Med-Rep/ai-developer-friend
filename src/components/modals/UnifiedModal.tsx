
import React from 'react';
import { BaseModal } from './core/BaseModal';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xl' | 'full';
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline';
    loading?: boolean;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  };
  alert?: {
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
  };
  loading?: boolean;
  preventClose?: boolean;
}

export function UnifiedModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  primaryAction,
  secondaryAction,
  alert,
  loading = false,
  preventClose = false
}: UnifiedModalProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getAlertClass = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const footer = (primaryAction || secondaryAction) ? (
    <div className="flex justify-end space-x-2">
      {secondaryAction && (
        <Button
          variant={secondaryAction.variant || 'outline'}
          onClick={secondaryAction.onClick}
          disabled={loading}
        >
          {secondaryAction.label}
        </Button>
      )}
      {primaryAction && (
        <Button
          variant={primaryAction.variant || 'default'}
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled || loading}
        >
          {primaryAction.loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {primaryAction.label}
        </Button>
      )}
    </div>
  ) : undefined;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      footer={footer}
      preventClose={preventClose}
    >
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {alert && (
            <Alert className={`mb-4 ${getAlertClass(alert.type)}`}>
              {getAlertIcon(alert.type)}
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}
          {children}
        </>
      )}
    </BaseModal>
  );
}
