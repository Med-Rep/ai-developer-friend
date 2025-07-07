
import React, { useEffect } from 'react';
import { securityMonitor } from '@/utils/enhancedSecurity';
import { useSecurity } from './SecurityProvider';

interface EnhancedSecurityWrapperProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  allowedRoles?: string[];
  sensitiveData?: boolean;
}

export function EnhancedSecurityWrapper({
  children,
  requiresAuth = false,
  allowedRoles = [],
  sensitiveData = false
}: EnhancedSecurityWrapperProps) {
  const { reportThreat, securityLevel } = useSecurity();

  useEffect(() => {
    if (sensitiveData) {
      securityMonitor.logSecurityEvent('sensitive_data_access', {
        timestamp: new Date().toISOString(),
        requiresAuth,
        allowedRoles
      });
    }
  }, [sensitiveData, requiresAuth, allowedRoles]);

  // Validation des entrées utilisateur
  const validateUserInput = (input: string, context: string) => {
    const validation = securityMonitor.validateInput(input, context);
    
    if (!validation.isValid) {
      reportThreat('suspicious_input', {
        input: input.substring(0, 50),
        threats: validation.threats,
        context
      });
    }
    
    return validation;
  };

  // Injection du contexte de sécurité dans les composants enfants
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        securityContext: {
          validateInput: validateUserInput,
          securityLevel,
          sensitiveData
        }
      });
    }
    return child;
  });

  return <>{enhancedChildren}</>;
}
