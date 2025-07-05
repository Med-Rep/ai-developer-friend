
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Procedure = Database['public']['Tables']['administrative_procedures']['Row'];
type ProcedureInsert = Database['public']['Tables']['administrative_procedures']['Insert'];
type ProcedureUpdate = Database['public']['Tables']['administrative_procedures']['Update'];

export class ProceduresService {
  static async getAll(filters?: {
    category?: string;
    institution?: string;
    search?: string;
  }) {
    let query = supabase
      .from('administrative_procedures')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.institution) {
      query = query.eq('institution', filters.institution);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching procedures:', error);
      throw error;
    }

    return data || [];
  }

  static async getById(id: string) {
    const { data, error } = await supabase
      .from('administrative_procedures')
      .select(`
        *,
        procedure_steps(*),
        procedure_documents(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching procedure:', error);
      throw error;
    }

    return data;
  }

  static async create(procedure: ProcedureInsert) {
    const { data, error } = await supabase
      .from('administrative_procedures')
      .insert({
        ...procedure,
        created_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating procedure:', error);
      throw error;
    }

    return data;
  }

  static async update(id: string, updates: ProcedureUpdate) {
    const { data, error } = await supabase
      .from('administrative_procedures')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating procedure:', error);
      throw error;
    }

    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('administrative_procedures')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting procedure:', error);
      throw error;
    }
  }

  static async getUserProgress(userId: string) {
    const { data, error } = await supabase
      .from('user_procedure_progress')
      .select(`
        *,
        administrative_procedures(title, category)
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }

    return data || [];
  }
}
