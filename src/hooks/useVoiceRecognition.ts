
import { useState, useCallback, useRef } from 'react';

interface VoiceRecognitionOptions {
  onStart?: () => void;
  onEnd?: () => void;
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
}

interface VoiceRecognitionHook {
  startListening: () => void;
  stopListening: () => void;
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  error: string | null;
  resetTranscript: () => void;
}

export function useVoiceRecognition(
  onResult: (result: string) => void,
  options: VoiceRecognitionOptions = {}
): VoiceRecognitionHook {
  const [isSupported] = useState(() => 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = options.continuous || false;
      recognitionRef.current.interimResults = options.interimResults || false;
      recognitionRef.current.lang = options.language || 'fr-FR';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setError(null);
        options.onStart?.();
      };

      recognitionRef.current.onresult = (event: any) => {
        if (event.results.length > 0) {
          const result = event.results[0][0].transcript;
          setTranscript(result);
          onResult(result);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        options.onEnd?.();
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(`Erreur de reconnaissance vocale: ${event.error}`);
        setIsListening(false);
        options.onEnd?.();
      };

      recognitionRef.current.start();
    } catch (error) {
      setError('Erreur lors du démarrage de la reconnaissance vocale');
      setIsListening(false);
    }
  }, [isSupported, onResult, options]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  return {
    startListening,
    stopListening,
    isSupported,
    isListening,
    transcript,
    error,
    resetTranscript
  };
}
