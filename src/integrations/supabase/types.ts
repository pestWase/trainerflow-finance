export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          event_id: string
          id: string
          marked_at: string
          notes: string | null
          status: Database["public"]["Enums"]["attendance_status"]
          student_id: string
        }
        Insert: {
          event_id: string
          id?: string
          marked_at?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          student_id: string
        }
        Update: {
          event_id?: string
          id?: string
          marked_at?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      body_measurements: {
        Row: {
          body_fat_percentage: number | null
          chest_cm: number | null
          created_at: string
          height_cm: number | null
          hips_cm: number | null
          id: string
          left_arm_cm: number | null
          left_calf_cm: number | null
          left_thigh_cm: number | null
          measurement_date: string
          notes: string | null
          recorded_by: string
          right_arm_cm: number | null
          right_calf_cm: number | null
          right_thigh_cm: number | null
          student_id: string
          waist_cm: number | null
          weight_kg: number | null
        }
        Insert: {
          body_fat_percentage?: number | null
          chest_cm?: number | null
          created_at?: string
          height_cm?: number | null
          hips_cm?: number | null
          id?: string
          left_arm_cm?: number | null
          left_calf_cm?: number | null
          left_thigh_cm?: number | null
          measurement_date?: string
          notes?: string | null
          recorded_by: string
          right_arm_cm?: number | null
          right_calf_cm?: number | null
          right_thigh_cm?: number | null
          student_id: string
          waist_cm?: number | null
          weight_kg?: number | null
        }
        Update: {
          body_fat_percentage?: number | null
          chest_cm?: number | null
          created_at?: string
          height_cm?: number | null
          hips_cm?: number | null
          id?: string
          left_arm_cm?: number | null
          left_calf_cm?: number | null
          left_thigh_cm?: number | null
          measurement_date?: string
          notes?: string | null
          recorded_by?: string
          right_arm_cm?: number | null
          right_calf_cm?: number | null
          right_thigh_cm?: number | null
          student_id?: string
          waist_cm?: number | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "body_measurements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          end_time: string
          id: string
          personal_id: string
          start_time: string
          student_id: string
          title: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          personal_id: string
          start_time: string
          student_id: string
          title: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          personal_id?: string
          start_time?: string
          student_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          created_at: string
          description: string | null
          equipment: string | null
          id: string
          image_url: string | null
          instructions: string | null
          muscle_groups: string[] | null
          name: string
          personal_id: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          equipment?: string | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          muscle_groups?: string[] | null
          name: string
          personal_id: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          equipment?: string | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          muscle_groups?: string[] | null
          name?: string
          personal_id?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          created_at: string
          due_date: string
          event_id: string | null
          id: string
          method: Database["public"]["Enums"]["payment_method"]
          notes: string | null
          package_id: string | null
          paid_at: string | null
          payment_type: string
          personal_id: string
          pricing_plan_id: string | null
          quantity: number | null
          reference: string | null
          status: Database["public"]["Enums"]["payment_status"]
          student_id: string
          subscription_id: string | null
          updated_at: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          due_date: string
          event_id?: string | null
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          package_id?: string | null
          paid_at?: string | null
          payment_type?: string
          personal_id: string
          pricing_plan_id?: string | null
          quantity?: number | null
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          student_id: string
          subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          due_date?: string
          event_id?: string | null
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          notes?: string | null
          package_id?: string | null
          paid_at?: string | null
          payment_type?: string
          personal_id?: string
          pricing_plan_id?: string | null
          quantity?: number | null
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          student_id?: string
          subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "student_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_pricing_plan_id_fkey"
            columns: ["pricing_plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_plans: {
        Row: {
          base_price_cents: number
          created_at: string
          discount_percentage: number | null
          duration_minutes: number | null
          id: string
          is_active: boolean
          name: string
          personal_id: string
          sessions_included: number | null
          type: Database["public"]["Enums"]["pricing_plan_type"]
          updated_at: string
        }
        Insert: {
          base_price_cents: number
          created_at?: string
          discount_percentage?: number | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean
          name: string
          personal_id: string
          sessions_included?: number | null
          type: Database["public"]["Enums"]["pricing_plan_type"]
          updated_at?: string
        }
        Update: {
          base_price_cents?: number
          created_at?: string
          discount_percentage?: number | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean
          name?: string
          personal_id?: string
          sessions_included?: number | null
          type?: Database["public"]["Enums"]["pricing_plan_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          specialty: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          specialty?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          specialty?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      progress_photos: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          photo_date: string
          photo_type: string
          photo_url: string
          student_id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          photo_date?: string
          photo_type: string
          photo_url: string
          student_id: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          photo_date?: string
          photo_type?: string
          photo_url?: string
          student_id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_photos_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_anamnesis: {
        Row: {
          additional_notes: string | null
          created_at: string
          health_history: string | null
          id: string
          medications: string | null
          objectives: string | null
          restrictions: string | null
          student_id: string
          training_experience: string | null
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          created_at?: string
          health_history?: string | null
          id?: string
          medications?: string | null
          objectives?: string | null
          restrictions?: string | null
          student_id: string
          training_experience?: string | null
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          created_at?: string
          health_history?: string | null
          id?: string
          medications?: string | null
          objectives?: string | null
          restrictions?: string | null
          student_id?: string
          training_experience?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_anamnesis_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_packages: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          notes: string | null
          payment_id: string | null
          pricing_plan_id: string
          purchased_at: string
          sessions_purchased: number
          sessions_remaining: number | null
          sessions_used: number
          status: Database["public"]["Enums"]["package_status"]
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          notes?: string | null
          payment_id?: string | null
          pricing_plan_id: string
          purchased_at?: string
          sessions_purchased: number
          sessions_remaining?: number | null
          sessions_used?: number
          status?: Database["public"]["Enums"]["package_status"]
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          notes?: string | null
          payment_id?: string | null
          pricing_plan_id?: string
          purchased_at?: string
          sessions_purchased?: number
          sessions_remaining?: number | null
          sessions_used?: number
          status?: Database["public"]["Enums"]["package_status"]
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_packages_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_packages_pricing_plan_id_fkey"
            columns: ["pricing_plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_packages_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string
          id: string
          medical_notes: string | null
          objective: string | null
          personal_id: string
          phone: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          id?: string
          medical_notes?: string | null
          objective?: string | null
          personal_id: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          id?: string
          medical_notes?: string | null
          objective?: string | null
          personal_id?: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount_cents: number
          created_at: string
          day_of_month: number
          id: string
          is_active: boolean
          name: string
          next_due_date: string
          personal_id: string
          start_date: string
          student_id: string
          updated_at: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          day_of_month?: number
          id?: string
          is_active?: boolean
          name?: string
          next_due_date: string
          personal_id: string
          start_date?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          day_of_month?: number
          id?: string
          is_active?: boolean
          name?: string
          next_due_date?: string
          personal_id?: string
          start_date?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string
          exercise_id: string
          id: string
          notes: string | null
          order_index: number
          reps: string
          rest_seconds: number | null
          sets: number
          weight: string | null
          workout_id: string
        }
        Insert: {
          created_at?: string
          exercise_id: string
          id?: string
          notes?: string | null
          order_index?: number
          reps?: string
          rest_seconds?: number | null
          sets?: number
          weight?: string | null
          workout_id: string
        }
        Update: {
          created_at?: string
          exercise_id?: string
          id?: string
          notes?: string | null
          order_index?: number
          reps?: string
          rest_seconds?: number | null
          sets?: number
          weight?: string | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_logs: {
        Row: {
          completed_at: string
          id: string
          notes: string | null
          reps_completed: string | null
          sets_completed: number | null
          student_id: string
          weight_used: string | null
          workout_exercise_id: string
          workout_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          notes?: string | null
          reps_completed?: string | null
          sets_completed?: number | null
          student_id: string
          weight_used?: string | null
          workout_exercise_id: string
          workout_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          notes?: string | null
          reps_completed?: string | null
          sets_completed?: number | null
          student_id?: string
          weight_used?: string | null
          workout_exercise_id?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_logs_workout_exercise_id_fkey"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_logs_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          personal_id: string
          student_id: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          personal_id: string
          student_id: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          personal_id?: string
          student_id?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "personal" | "aluno"
      attendance_status: "present" | "absent" | "late"
      package_status: "active" | "expired" | "depleted"
      payment_method: "pix" | "cash" | "transfer" | "card" | "other"
      payment_status: "pending" | "paid" | "failed" | "overdue" | "refunded"
      pricing_plan_type: "per_session" | "package" | "monthly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["personal", "aluno"],
      attendance_status: ["present", "absent", "late"],
      package_status: ["active", "expired", "depleted"],
      payment_method: ["pix", "cash", "transfer", "card", "other"],
      payment_status: ["pending", "paid", "failed", "overdue", "refunded"],
      pricing_plan_type: ["per_session", "package", "monthly"],
    },
  },
} as const
