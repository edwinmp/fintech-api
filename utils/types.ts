export interface Customer {
  customer_id: number;
  name: string;
  created_at: string;
}

export interface DatabaseManagerResponse<T> {
  error?: string;
  data?: T;
}
