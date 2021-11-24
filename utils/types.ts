export interface Customer {
  customer_id: number;
  name: string;
  created_at: string;
}

export interface APYCalculation {
  customer_id: number;
  deposit: number;
  interest_rate: number;
  yearly_compound_times: number;
  value: number;
  created_at: string;
}

export interface ManagerResponse<T> {
  error?: string;
  data?: T;
}
