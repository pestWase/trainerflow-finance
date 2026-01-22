import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

const Attendance = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Frequência</h1>
          <p className="text-muted-foreground">Controle de presença dos alunos</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Registro de Frequência
            </CardTitle>
          </CardHeader>
          <CardContent className="py-8 text-center text-muted-foreground">
            Selecione um evento na agenda para registrar a frequência
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
