
import { securityMonitor } from './enhancedSecurity';

export class SecurityEnhancements {
  private static instance: SecurityEnhancements;
  private sessionTimeout = 30 * 60 * 1000; // 30 minutes
  private maxFailedAttempts = 5;
  private lockoutDuration = 15 * 60 * 1000; // 15 minutes

  static getInstance(): SecurityEnhancements {
    if (!SecurityEnhancements.instance) {
      SecurityEnhancements.instance = new SecurityEnhancements();
    }
    return SecurityEnhancements.instance;
  }

  // Validation renforcée des entrées
  validateAndSanitizeInput(input: string, context: string): {
    isValid: boolean;
    sanitized: string;
    threats: string[];
  } {
    const validation = securityMonitor.validateInput(input, context);
    
    return {
      isValid: validation.isValid,
      sanitized: validation.sanitized,
      threats: validation.threats
    };
  }

  // Gestion des sessions sécurisées
  initializeSecureSession(): void {
    const sessionId = crypto.randomUUID();
    const timestamp = Date.now();
    
    sessionStorage.setItem('secure_session', JSON.stringify({
      id: sessionId,
      timestamp,
      lastActivity: timestamp
    }));

    this.setupSessionTimeout();
  }

  private setupSessionTimeout(): void {
    setInterval(() => {
      const session = this.getSession();
      if (session && Date.now() - session.lastActivity > this.sessionTimeout) {
        this.terminateSession();
      }
    }, 60000); // Vérifier chaque minute
  }

  updateSessionActivity(): void {
    const session = this.getSession();
    if (session) {
      session.lastActivity = Date.now();
      sessionStorage.setItem('secure_session', JSON.stringify(session));
    }
  }

  private getSession(): any {
    const sessionData = sessionStorage.getItem('secure_session');
    return sessionData ? JSON.parse(sessionData) : null;
  }

  private terminateSession(): void {
    sessionStorage.removeItem('secure_session');
    window.location.reload();
  }

  // Protection contre les attaques par force brute
  trackFailedAttempt(identifier: string): boolean {
    const key = `failed_attempts_${identifier}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    const now = Date.now();
    
    // Nettoyer les tentatives anciennes
    const recentAttempts = attempts.filter((attempt: number) => 
      now - attempt < this.lockoutDuration
    );
    
    recentAttempts.push(now);
    localStorage.setItem(key, JSON.stringify(recentAttempts));
    
    return recentAttempts.length >= this.maxFailedAttempts;
  }

  isAccountLocked(identifier: string): boolean {
    const key = `failed_attempts_${identifier}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    const now = Date.now();
    
    const recentAttempts = attempts.filter((attempt: number) => 
      now - attempt < this.lockoutDuration
    );
    
    return recentAttempts.length >= this.maxFailedAttempts;
  }

  clearFailedAttempts(identifier: string): void {
    const key = `failed_attempts_${identifier}`;
    localStorage.removeItem(key);
  }

  // Chiffrement des données sensibles
  encryptSensitiveData(data: string): string {
    // Implémentation simple - en production, utiliser une vraie librairie de chiffrement
    return btoa(data);
  }

  decryptSensitiveData(encryptedData: string): string {
    try {
      return atob(encryptedData);
    } catch {
      return '';
    }
  }
}

export const securityEnhancements = SecurityEnhancements.getInstance();
