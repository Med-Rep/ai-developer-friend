
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProceduresService } from '@/services/proceduresService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/AuthProvider';

export function useProcedures(filters?: {
  category?: string;
  institution?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['procedures', filters],
    queryFn: () => ProceduresService.getAll(filters),
  });
}

export function useProcedure(id: string) {
  return useQuery({
    queryKey: ['procedure', id],
    queryFn: () => ProceduresService.getById(id),
    enabled: !!id,
  });
}

export function useCreateProcedure() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ProceduresService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedures'] });
      toast({
        title: "Succès",
        description: "Procédure créée avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de créer la procédure",
        variant: "destructive",
      });
    },
  });
}

export function useUserProgress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-progress', user?.id],
    queryFn: () => user ? ProceduresService.getUserProgress(user.id) : [],
    enabled: !!user,
  });
}
