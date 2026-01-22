import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, CreditCard, Dumbbell } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TrainerFlow</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost">Entrar</Button>
            <Button>Começar Grátis</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Gestão Completa para{" "}
          <span className="text-primary">Personal Trainers</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Gerencie seus alunos, treinos, agenda e pagamentos em um único lugar.
          Simplifique sua rotina e foque no que realmente importa.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Começar Agora</Button>
          <Button size="lg" variant="outline">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tudo que você precisa
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Gestão de Alunos</CardTitle>
              <CardDescription>
                Cadastre e acompanhe todos os seus alunos com histórico completo
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Dumbbell className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Treinos Personalizados</CardTitle>
              <CardDescription>
                Crie e gerencie treinos para cada aluno com facilidade
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Agenda Inteligente</CardTitle>
              <CardDescription>
                Organize seus horários e evite conflitos de agenda
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CreditCard className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Controle Financeiro</CardTitle>
              <CardDescription>
                Gerencie pagamentos, pacotes e assinaturas dos alunos
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 TrainerFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
