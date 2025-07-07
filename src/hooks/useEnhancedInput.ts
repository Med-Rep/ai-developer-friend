
import { useState, useCallback } from 'react';
import { useVoiceRecognition } from './useVoiceRecognition';

interface UseEnhancedInputOptions {
  context?: 'search' | 'legal' | 'procedure' | 'general';
  enableVoice?: boolean;
  enableSuggestions?: boolean;
  language?: string;
  onResult?: (result: string) => void;
}

export function useEnhancedInput(options: UseEnhancedInputOptions = {}) {
  const {
    context = 'general',
    enableVoice = true,
    enableSuggestions = true,
    language = 'fr-FR',
    onResult
  } = options;

  const [value, setValue] = useState('');
  
  const handleResult = useCallback((result: string) => {
    setValue(result);
    onResult?.(result);
  }, [onResult]);

  const {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceRecognition(handleResult, {
    continuous: false,
    interimResults: true,
    language
  });

  const handleValueChange = useCallback((newValue: string) => {
    setValue(newValue);
    onResult?.(newValue);
  }, [onResult]);

  return {
    value,
    setValue: handleValueChange,
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
    context,
    enableVoice,
    enableSuggestions
  };
}
