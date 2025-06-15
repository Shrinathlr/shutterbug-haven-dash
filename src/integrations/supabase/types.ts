export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bank_details: {
        Row: {
          account_number: string | null
          created_at: string
          id: string
          ifsc_code: string | null
        }
        Insert: {
          account_number?: string | null
          created_at?: string
          id?: string
          ifsc_code?: string | null
        }
        Update: {
          account_number?: string | null
          created_at?: string
          id?: string
          ifsc_code?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string | null
          date: string
          id: string
          location: string | null
          photographer_id: string | null
          status: string
          type: string
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          location?: string | null
          photographer_id?: string | null
          status: string
          type: string
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          location?: string | null
          photographer_id?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_photographer_id_fkey"
            columns: ["photographer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          category: string
          country: string
          id: string
          updated_at: string | null
          value: number
        }
        Insert: {
          category: string
          country: string
          id?: string
          updated_at?: string | null
          value: number
        }
        Update: {
          category?: string
          country?: string
          id?: string
          updated_at?: string | null
          value?: number
        }
        Relationships: []
      }
      customer_requests: {
        Row: {
          created_at: string | null
          customer_id: string
          details: string | null
          event_date: string | null
          event_type: string
          id: string
          photographer_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          details?: string | null
          event_date?: string | null
          event_type: string
          id?: string
          photographer_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          details?: string | null
          event_date?: string | null
          event_type?: string
          id?: string
          photographer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_requests_photographer_id_fkey"
            columns: ["photographer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dispute_evidence: {
        Row: {
          created_at: string | null
          dispute_id: string | null
          id: string
          text: string | null
          type: string
          uploaded_by: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          dispute_id?: string | null
          id?: string
          text?: string | null
          type: string
          uploaded_by?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          dispute_id?: string | null
          id?: string
          text?: string | null
          type?: string
          uploaded_by?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dispute_evidence_dispute_id_fkey"
            columns: ["dispute_id"]
            isOneToOne: false
            referencedRelation: "disputes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispute_evidence_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      disputes: {
        Row: {
          against_user: string | null
          booking_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          reason: string
          status: string | null
        }
        Insert: {
          against_user?: string | null
          booking_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          reason: string
          status?: string | null
        }
        Update: {
          against_user?: string | null
          booking_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          reason?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disputes_against_user_fkey"
            columns: ["against_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      finance: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          type?: string
        }
        Relationships: []
      }
      kyc_documents: {
        Row: {
          id: string
          kyc_id: string | null
          type: string | null
          uploaded_at: string | null
          url: string | null
        }
        Insert: {
          id?: string
          kyc_id?: string | null
          type?: string | null
          uploaded_at?: string | null
          url?: string | null
        }
        Update: {
          id?: string
          kyc_id?: string | null
          type?: string | null
          uploaded_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_documents_kyc_id_fkey"
            columns: ["kyc_id"]
            isOneToOne: false
            referencedRelation: "kyc_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_submissions: {
        Row: {
          id: string
          location: string
          name: string
          status: string | null
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          location: string
          name: string
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          location?: string
          name?: string
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string | null
          id: string
          title: string
          to_role: string | null
          to_user: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          title: string
          to_role?: string | null
          to_user?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          title?: string
          to_role?: string | null
          to_user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_to_user_fkey"
            columns: ["to_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          kyc_doc_url: string | null
          kyc_status: string | null
          location: string | null
          onboarded: boolean | null
          profile_photo_url: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          kyc_doc_url?: string | null
          kyc_status?: string | null
          location?: string | null
          onboarded?: boolean | null
          profile_photo_url?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          kyc_doc_url?: string | null
          kyc_status?: string | null
          location?: string | null
          onboarded?: boolean | null
          profile_photo_url?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          location: string | null
          name: string | null
          phone: string | null
          profile_image_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name?: string | null
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          location?: string | null
          name?: string | null
          phone?: string | null
          profile_image_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
