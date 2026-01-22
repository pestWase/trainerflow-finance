import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import Schedule from "@/pages/Schedule";
import Attendance from "@/pages/Attendance";
import Exercises from "@/pages/Exercises";
import Workouts from "@/pages/Workouts";
import Evolution from "@/pages/Evolution";
import Financial from "@/pages/Financial";
import PricingPlans from "@/pages/PricingPlans";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/alunos" element={<PrivateRoute><Students /></PrivateRoute>} />
            <Route path="/agenda" element={<PrivateRoute><Schedule /></PrivateRoute>} />
            <Route path="/frequencia" element={<PrivateRoute><Attendance /></PrivateRoute>} />
            <Route path="/exercicios" element={<PrivateRoute><Exercises /></PrivateRoute>} />
            <Route path="/treinos" element={<PrivateRoute><Workouts /></PrivateRoute>} />
            <Route path="/evolucao" element={<PrivateRoute><Evolution /></PrivateRoute>} />
            <Route path="/financeiro" element={<PrivateRoute><Financial /></PrivateRoute>} />
            <Route path="/planos" element={<PrivateRoute><PricingPlans /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
