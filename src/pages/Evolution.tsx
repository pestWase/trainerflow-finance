import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const Evolution = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Evolução</h1>
          <p className="text-muted-foreground">Acompanhe o progresso dos alunos</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progresso dos Alunos
            </CardTitle>
          </CardHeader>
          <CardContent className="py-8 text-center text-muted-foreground">
            Selecione um aluno para ver sua evolução
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Evolution;
