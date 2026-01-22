import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type PaymentRow = Database['public']['Tables']['payments']['Row'];
type PaymentStatus = Database['public']['Enums']['payment_status'];
type PaymentMethod = Database['public']['Enums']['payment_method'];

export interface Payment extends PaymentRow {}

export interface CreatePaymentData {
  student_id: string;
  amount_cents: number;
  due_date: string;
  method?: PaymentMethod;
  status?: PaymentStatus;
  notes?: string;
  reference?: string;
}

export const usePayments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ['payments', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('due_date', { ascending: false });
      
      if (error) throw error;
      return data as Payment[];
    },
    enabled: !!user,
  });

  const createPayment = useMutation({
    mutationFn: async (data: CreatePaymentData) => {
      const { data: newPayment, error } = await supabase
        .from('payments')
        .insert({
          ...data,
          personal_id: user!.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return newPayment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast({ title: 'Pagamento registrado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao registrar pagamento', description: error.message, variant: 'destructive' });
    },
  });

  const updatePayment = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Payment> & { id: string }) => {
      const { data: updated, error } = await supabase
        .from('payments')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast({ title: 'Pagamento atualizado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao atualizar pagamento', description: error.message, variant: 'destructive' });
    },
  });

  const deletePayment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('payments').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast({ title: 'Pagamento removido com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao remover pagamento', description: error.message, variant: 'destructive' });
    },
  });

  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const paidPayments = payments.filter((p) => p.status === 'paid');
  const overduePayments = payments.filter((p) => p.status === 'overdue');

  const totalReceived = paidPayments.reduce((sum, p) => sum + p.amount_cents, 0);
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount_cents, 0);

  return {
    payments,
    pendingPayments,
    paidPayments,
    overduePayments,
    totalReceived,
    totalPending,
    isLoading,
    error,
    createPayment,
    updatePayment,
    deletePayment,
  };
};
