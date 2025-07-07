
import React from 'react';
import { performanceMonitor } from './performanceMonitor';

export class PerformanceOptimizations {
  private static instance: PerformanceOptimizations;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private maxCacheSize = 100;
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  static getInstance(): PerformanceOptimizations {
    if (!PerformanceOptimizations.instance) {
      PerformanceOptimizations.instance = new PerformanceOptimizations();
    }
    return PerformanceOptimizations.instance;
  }

  // Cache intelligent avec TTL
  setCache(key: string, data: any, ttl: number = this.defaultTTL): void {
    // Nettoyer le cache si trop plein
    if (this.cache.size >= this.maxCacheSize) {
      const oldestKey = Array.from(this.cache.keys())[0];
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });

    performanceMonitor.recordMetric('cache_set', Date.now(), 'memory');
  }

  getCache(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) {
      performanceMonitor.recordMetric('cache_miss', Date.now(), 'memory');
      return null;
    }

    // Vérifier si le cache est expiré
    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      performanceMonitor.recordMetric('cache_expired', Date.now(), 'memory');
      return null;
    }

    performanceMonitor.recordMetric('cache_hit', Date.now(), 'memory');
    return cached.data;
  }

  clearCache(): void {
    this.cache.clear();
    performanceMonitor.recordMetric('cache_cleared', Date.now(), 'memory');
  }

  // Debounce pour les recherches
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  // Throttle pour les événements fréquents
  throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let lastCall = 0;
    
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }

  // Lazy loading pour les composants
  createLazyComponent<T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>
  ): React.LazyExoticComponent<T> {
    return React.lazy(importFunc);
  }

  // Optimisation des re-renders
  shallowEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) {
      return false;
    }
    
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    
    return true;
  }
}

export const performanceOptimizations = PerformanceOptimizations.getInstance();
