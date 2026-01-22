import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Student {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  objective: string | null;
  medical_notes: string | null;
  address: string | null;
  avatar_url: string | null;
  status: string;
  user_id: string | null;
  personal_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateStudentData {
  full_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  objective?: string;
  medical_notes?: string;
  address?: string;
}

export const useStudents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('full_name');
      
      if (error) throw error;
      return data as Student[];
    },
    enabled: !!user,
  });

  const createStudent = useMutation({
    mutationFn: async (data: CreateStudentData) => {
      const { data: newStudent, error } = await supabase
        .from('students')
        .insert({
          ...data,
          personal_id: user!.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return newStudent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({ title: 'Aluno cadastrado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao cadastrar aluno', description: error.message, variant: 'destructive' });
    },
  });

  const updateStudent = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Student> & { id: string }) => {
      const { data: updated, error } = await supabase
        .from('students')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({ title: 'Aluno atualizado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao atualizar aluno', description: error.message, variant: 'destructive' });
    },
  });

  const deleteStudent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('students').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({ title: 'Aluno removido com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao remover aluno', description: error.message, variant: 'destructive' });
    },
  });

  const activeStudents = students.filter((s) => s.status === 'active');

  return {
    students,
    activeStudents,
    isLoading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};
