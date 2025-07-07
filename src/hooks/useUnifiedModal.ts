
import { useState, useCallback } from 'react';

interface ModalState {
  isOpen: boolean;
  data?: any;
  loading?: boolean;
  error?: string;
}

export function useUnifiedModal() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    data: null,
    loading: false,
    error: undefined
  });

  const openModal = useCallback((data?: any) => {
    setModalState({
      isOpen: true,
      data,
      loading: false,
      error: undefined
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      isOpen: false,
      error: undefined
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setModalState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string) => {
    setModalState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const updateData = useCallback((data: any) => {
    setModalState(prev => ({ ...prev, data }));
  }, []);

  return {
    modalState,
    openModal,
    closeModal,
    setLoading,
    setError,
    updateData
  };
}
