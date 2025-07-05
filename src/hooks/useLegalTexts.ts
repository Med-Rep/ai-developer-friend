
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LegalTextsService } from '@/services/legalTextsService';
import { useToast } from '@/hooks/use-toast';

export function useLegalTexts(filters?: {
  category?: string;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['legal-texts', filters],
    queryFn: () => LegalTextsService.getAll(filters),
  });
}

export function useLegalText(id: string) {
  return useQuery({
    queryKey: ['legal-text', id],
    queryFn: () => LegalTextsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateLegalText() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: LegalTextsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legal-texts'] });
      toast({
        title: "Succès",
        description: "Texte juridique créé avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de créer le texte juridique",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateLegalText() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      LegalTextsService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legal-texts'] });
      toast({
        title: "Succès",
        description: "Texte juridique mis à jour avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le texte juridique",
        variant: "destructive",
      });
    },
  });
}

export function useLegalCategories() {
  return useQuery({
    queryKey: ['legal-categories'],
    queryFn: LegalTextsService.getCategories,
  });
}
