import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStudents } from '@/hooks/useStudents';
import { useEvents } from '@/hooks/useEvents';
import { usePayments } from '@/hooks/usePayments';
import { Users, UserCheck, Calendar, CalendarDays, DollarSign, TrendingUp } from 'lucide-react';

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      {trend && (
        <p className="text-xs text-primary flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3" />
          {trend}
        </p>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { students, activeStudents, isLoading: loadingStudents } = useStudents();
  const { todayEvents, weekEvents, isLoading: loadingEvents } = useEvents();
  const { totalReceived, totalPending, isLoading: loadingPayments } = usePayments();

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(cents / 100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total de Alunos"
            value={loadingStudents ? '...' : students.length}
            description="Cadastrados no sistema"
            icon={Users}
          />
          <StatCard
            title="Alunos Ativos"
            value={loadingStudents ? '...' : activeStudents.length}
            description="Com status ativo"
            icon={UserCheck}
          />
          <StatCard
            title="Aulas Hoje"
            value={loadingEvents ? '...' : todayEvents.length}
            description="Agendadas para hoje"
            icon={Calendar}
          />
          <StatCard
            title="Aulas na Semana"
            value={loadingEvents ? '...' : weekEvents.length}
            description="Esta semana"
            icon={CalendarDays}
          />
        </div>

        {/* Financial Summary */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Resumo Financeiro
              </CardTitle>
              <CardDescription>Visão geral dos pagamentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium">Total Recebido</span>
                <span className="text-lg font-bold text-primary">
                  {loadingPayments ? '...' : formatCurrency(totalReceived)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Pendente</span>
                <span className="text-lg font-bold">
                  {loadingPayments ? '...' : formatCurrency(totalPending)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Próximas Aulas
              </CardTitle>
              <CardDescription>Agenda de hoje</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingEvents ? (
                <div className="text-center py-4 text-muted-foreground">Carregando...</div>
              ) : todayEvents.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  Nenhuma aula agendada para hoje
                </div>
              ) : (
                <div className="space-y-2">
                  {todayEvents.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div
                        className="w-2 h-8 rounded-full"
                        style={{ backgroundColor: event.color || '#D4AF37' }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.start_time).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
