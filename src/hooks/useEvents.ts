import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Event {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  color: string | null;
  student_id: string;
  personal_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  color?: string;
  student_id: string;
}

export const useEvents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data as Event[];
    },
    enabled: !!user,
  });

  const createEvent = useMutation({
    mutationFn: async (data: CreateEventData) => {
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert({
          ...data,
          personal_id: user!.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return newEvent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Evento criado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao criar evento', description: error.message, variant: 'destructive' });
    },
  });

  const updateEvent = useMutation({
    mutationFn: async ({ id, ...data }: Partial<Event> & { id: string }) => {
      const { data: updated, error } = await supabase
        .from('events')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Evento atualizado com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao atualizar evento', description: error.message, variant: 'destructive' });
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({ title: 'Evento removido com sucesso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao remover evento', description: error.message, variant: 'destructive' });
    },
  });

  // Get today's events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayEvents = events.filter((e) => {
    const eventDate = new Date(e.start_time);
    return eventDate >= today && eventDate < tomorrow;
  });

  // Get this week's events
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const weekEvents = events.filter((e) => {
    const eventDate = new Date(e.start_time);
    return eventDate >= startOfWeek && eventDate < endOfWeek;
  });

  return {
    events,
    todayEvents,
    weekEvents,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
