export type PackageStatus = "active" | "inactive";
export type InvestmentStatus = "pending" | "active" | "completed" | "cancelled";
export type PaymentStatus = "COMPLETE" | "PENDING" | "FAILED";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          phone_number: string | null;
          terms_accepted_at: string | null;
          terms_version: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          phone_number?: string | null;
          terms_accepted_at?: string | null;
          terms_version?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone_number?: string | null;
          terms_accepted_at?: string | null;
          terms_version?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      packages: {
        Row: {
          id: string;
          name: string;
          min_amount: number;
          monthly_return: number;
          active: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          min_amount: number;
          monthly_return: number;
          active?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          min_amount?: number;
          monthly_return?: number;
          active?: boolean;
          sort_order?: number;
        };
        Relationships: [];
      };
      investments: {
        Row: {
          id: string;
          user_id: string;
          package_id: string;
          amount: number;
          monthly_return: number;
          status: InvestmentStatus;
          terms_accepted_at: string;
          terms_version: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          package_id: string;
          amount: number;
          monthly_return: number;
          status?: InvestmentStatus;
          terms_accepted_at: string;
          terms_version: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          package_id?: string;
          amount?: number;
          monthly_return?: number;
          status?: InvestmentStatus;
          terms_accepted_at?: string;
          terms_version?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "investments_package_id_fkey";
            columns: ["package_id"];
            isOneToOne: false;
            referencedRelation: "packages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "investments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      payments: {
        Row: {
          id: string;
          investment_id: string;
          user_id: string;
          payfast_payment_id: string | null;
          amount: number;
          status: PaymentStatus;
          pf_payment_data: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          investment_id: string;
          user_id: string;
          payfast_payment_id?: string | null;
          amount: number;
          status: PaymentStatus;
          pf_payment_data?: Record<string, unknown> | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          investment_id?: string;
          user_id?: string;
          payfast_payment_id?: string | null;
          amount?: number;
          status?: PaymentStatus;
          pf_payment_data?: Record<string, unknown> | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_investment_id_fkey";
            columns: ["investment_id"];
            isOneToOne: false;
            referencedRelation: "investments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      withdrawal_requests: {
        Row: {
          id: string;
          user_id: string;
          investment_id: string;
          amount: number;
          status: "pending" | "approved" | "paid" | "rejected";
          reviewed_at: string | null;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          investment_id: string;
          amount: number;
          status?: "pending" | "approved" | "paid" | "rejected";
          reviewed_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          investment_id?: string;
          amount?: number;
          status?: "pending" | "approved" | "paid" | "rejected";
          reviewed_at?: string | null;
          paid_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "withdrawal_requests_investment_id_fkey";
            columns: ["investment_id"];
            isOneToOne: false;
            referencedRelation: "investments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "withdrawal_requests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Package = Database["public"]["Tables"]["packages"]["Row"];
export type Investment = Database["public"]["Tables"]["investments"]["Row"];
export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type WithdrawalRequest = Database["public"]["Tables"]["withdrawal_requests"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
