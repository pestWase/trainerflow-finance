import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Tag } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Database } from '@/integrations/supabase/types';

type PlanType = Database['public']['Enums']['pricing_plan_type'];

const PricingPlans = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'monthly' as PlanType,
    base_price: '',
    sessions_included: '1',
    duration_minutes: '60',
  });

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ['pricing_plans', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createPlan = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('pricing_plans').insert({
        name: data.name,
        type: data.type,
        base_price_cents: Math.round(parseFloat(data.base_price) * 100),
        sessions_included: parseInt(data.sessions_included),
        duration_minutes: parseInt(data.duration_minutes),
        personal_id: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pricing_plans'] });
      toast({ title: 'Plano criado com sucesso!' });
      setIsDialogOpen(false);
      setFormData({
        name: '',
        type: 'monthly',
        base_price: '',
        sessions_included: '1',
        duration_minutes: '60',
      });
    },
    onError: (error: Error) => {
      toast({ title: 'Erro ao criar plano', description: error.message, variant: 'destructive' });
    },
  });

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(cents / 100);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'monthly':
        return 'Mensalidade';
      case 'package':
        return 'Pacote';
      case 'single':
        return 'Aula Avulsa';
      default:
        return type;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPlan.mutate(formData);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Planos de Preço</h1>
            <p className="text-muted-foreground">Configure seus planos e valores</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Plano de Preço</DialogTitle>
                <DialogDescription>Configure um novo plano</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Nome do plano *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Select
                  value={formData.type}
                  onValueChange={(value: PlanType) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de plano *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensalidade</SelectItem>
                    <SelectItem value="package">Pacote de Aulas</SelectItem>
                    <SelectItem value="single">Aula Avulsa</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Valor (R$) *"
                  value={formData.base_price}
                  onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Sessões incluídas</label>
                    <Input
                      type="number"
                      value={formData.sessions_included}
                      onChange={(e) =>
                        setFormData({ ...formData, sessions_included: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Duração (min)</label>
                    <Input
                      type="number"
                      value={formData.duration_minutes}
                      onChange={(e) =>
                        setFormData({ ...formData, duration_minutes: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createPlan.isPending}>
                    {createPlan.isPending ? 'Salvando...' : 'Salvar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Carregando...</div>
        ) : plans.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nenhum plano cadastrado ainda
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      {plan.name}
                    </span>
                    <Badge variant={plan.is_active ? 'default' : 'secondary'}>
                      {plan.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {formatCurrency(plan.base_price_cents)}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Tipo: {getTypeLabel(plan.type)}</p>
                    <p>{plan.sessions_included} sessões de {plan.duration_minutes}min</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PricingPlans;
