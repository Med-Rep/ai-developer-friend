
import { useEffect, useState } from 'react';
import { securityEnhancements } from '@/utils/securityEnhancements';
import { useSecurity } from '@/components/security/SecurityProvider';

interface SecureComponentOptions {
  requiresAuth?: boolean;
  allowedRoles?: string[];
  sensitiveData?: boolean;
  logAccess?: boolean;
}

export function useSecureComponent(options: SecureComponentOptions = {}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { securityLevel, reportThreat } = useSecurity();

  useEffect(() => {
    const checkAuthorization = () => {
      if (options.logAccess) {
        console.log('Accès au composant sécurisé:', {
          requiresAuth: options.requiresAuth,
          allowedRoles: options.allowedRoles,
          sensitiveData: options.sensitiveData
        });
      }

      // Vérifications de sécurité basiques
      if (options.requiresAuth) {
        // Logique d'authentification
        setIsAuthorized(true); // Simplifié pour la démo
      } else {
        setIsAuthorized(true);
      }

      if (options.sensitiveData && securityLevel === 'high') {
        reportThreat('high_security_access', {
          component: 'secure_component',
          options
        });
      }

      setIsLoading(false);
    };

    checkAuthorization();
    securityEnhancements.updateSessionActivity();
  }, [options, securityLevel, reportThreat]);

  const validateInput = (input: string, context: string) => {
    return securityEnhancements.validateAndSanitizeInput(input, context);
  };

  return {
    isAuthorized,
    isLoading,
    validateInput,
    securityLevel
  };
}
