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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      contributor_applications: {
        Row: {
          country: string | null
          created_at: string
          essay: string
          full_name: string
          id: string
          role_wanted: string
          status: string
          user_id: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          essay: string
          full_name: string
          id?: string
          role_wanted?: string
          status?: string
          user_id: string
        }
        Update: {
          country?: string | null
          created_at?: string
          essay?: string
          full_name?: string
          id?: string
          role_wanted?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      country_participation: {
        Row: {
          country: string
          created_at: string
          edition: number
          id: string
          participants: number
          updated_at: string
        }
        Insert: {
          country: string
          created_at?: string
          edition?: number
          id?: string
          participants?: number
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          edition?: number
          id?: string
          participants?: number
          updated_at?: string
        }
        Relationships: []
      }
      interest_registrations: {
        Row: {
          country: string | null
          created_at: string
          email: string
          first_name: string
          grade: string | null
          id: string
          last_name: string
          school: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          email: string
          first_name: string
          grade?: string | null
          id?: string
          last_name: string
          school?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          grade?: string | null
          id?: string
          last_name?: string
          school?: string | null
        }
        Relationships: []
      }
      problem_proposals: {
        Row: {
          created_at: string
          difficulty: string
          id: string
          solution_sketch: string | null
          statement: string
          status: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty?: string
          id?: string
          solution_sketch?: string | null
          statement: string
          status?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty?: string
          id?: string
          solution_sketch?: string | null
          statement?: string
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      public_contributor_applications: {
        Row: {
          batch_id: string
          country: string | null
          created_at: string
          email: string
          essay: string
          first_name: string
          id: string
          last_name: string
          role_wanted: string
          status: string
        }
        Insert: {
          batch_id?: string
          country?: string | null
          created_at?: string
          email: string
          essay: string
          first_name: string
          id?: string
          last_name: string
          role_wanted?: string
          status?: string
        }
        Update: {
          batch_id?: string
          country?: string | null
          created_at?: string
          email?: string
          essay?: string
          first_name?: string
          id?: string
          last_name?: string
          role_wanted?: string
          status?: string
        }
        Relationships: []
      }
      public_problem_proposals: {
        Row: {
          batch_id: string
          country: string | null
          created_at: string
          difficulty: string
          email: string
          first_name: string
          id: string
          last_name: string
          solution_sketch: string | null
          statement: string
          status: string
          title: string
        }
        Insert: {
          batch_id?: string
          country?: string | null
          created_at?: string
          difficulty?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          solution_sketch?: string | null
          statement: string
          status?: string
          title: string
        }
        Update: {
          batch_id?: string
          country?: string | null
          created_at?: string
          difficulty?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          solution_sketch?: string | null
          statement?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
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
      participating_countries: {
        Args: never
        Returns: {
          country: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "user"
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
      app_role: ["admin", "staff", "user"],
    },
  },
} as const
