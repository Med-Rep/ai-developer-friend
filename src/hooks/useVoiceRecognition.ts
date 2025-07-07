
import { useState, useCallback, useRef } from 'react';

interface VoiceRecognitionOptions {
  onStart?: () => void;
  onEnd?: () => void;
}

interface VoiceRecognitionHook {
  startListening: () => void;
  stopListening: () => void;
  isSupported: boolean;
}

export function useVoiceRecognition(
  onResult: (result: string) => void,
  options: VoiceRecognitionOptions = {}
): VoiceRecognitionHook {
  const [isSupported] = useState(() => 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onstart = () => {
        options.onStart?.();
      };

      recognitionRef.current.onresult = (event: any) => {
        if (event.results.length > 0) {
          const transcript = event.results[0][0].transcript;
          onResult(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        options.onEnd?.();
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Erreur de reconnaissance vocale:', event.error);
        options.onEnd?.();
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Erreur lors du démarrage de la reconnaissance vocale:', error);
    }
  }, [isSupported, onResult, options]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return {
    startListening,
    stopListening,
    isSupported
  };
}
