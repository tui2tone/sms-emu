export enum TransactionStatus {
  Delivered = 'Delivered',
  Pending = 'Pending',
  Failed = 'Failed',
}

export interface Transaction {
  id: string;
  phone: string;
  message: string;
  sender: string;
  timestamp: string;
  status: TransactionStatus;
  cost?: number;
}

export interface CreateTransactionRequest {
  message: string;
  phone: string;
  sender?: string;
  timestamp?: string;
}

export interface CreateTransactionResponse {
  id: string;
  status: string;
  createdAt: string;
}

export interface TransactionsResponse {
  data: Transaction[];
  total: number;
}

export interface TransactionQuery {
  page?: number;
  limit?: number;
  status?: TransactionStatus;
  search?: string;
}
