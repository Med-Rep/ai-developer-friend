
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type LegalText = Database['public']['Tables']['legal_texts']['Row'];
type LegalTextInsert = Database['public']['Tables']['legal_texts']['Insert'];
type LegalTextUpdate = Database['public']['Tables']['legal_texts']['Update'];

export class LegalTextsService {
  static async getAll(filters?: {
    category?: string;
    status?: string;
    search?: string;
  }) {
    let query = supabase
      .from('legal_texts')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching legal texts:', error);
      throw error;
    }

    return data || [];
  }

  static async getById(id: string) {
    const { data, error } = await supabase
      .from('legal_texts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching legal text:', error);
      throw error;
    }

    return data;
  }

  static async create(legalText: LegalTextInsert) {
    const { data, error } = await supabase
      .from('legal_texts')
      .insert({
        ...legalText,
        created_by: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating legal text:', error);
      throw error;
    }

    return data;
  }

  static async update(id: string, updates: LegalTextUpdate) {
    const { data, error } = await supabase
      .from('legal_texts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating legal text:', error);
      throw error;
    }

    return data;
  }

  static async delete(id: string) {
    const { error } = await supabase
      .from('legal_texts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting legal text:', error);
      throw error;
    }
  }

  static async getCategories() {
    const { data, error } = await supabase
      .from('legal_categories')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    return data || [];
  }
}
