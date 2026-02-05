import type {
  Transaction,
  CreateTransactionRequest,
  CreateTransactionResponse,
  TransactionsResponse,
  TransactionQuery,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3100/api/v1/sms';

export const api = {
  async createTransaction(data: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const response = await fetch(`${API_BASE_URL}/receive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }

    return response.json();
  },

  async getTransactions(query: TransactionQuery = {}): Promise<TransactionsResponse> {
    const params = new URLSearchParams();
    if (query.page) params.append('page', query.page.toString());
    if (query.limit) params.append('limit', query.limit.toString());
    if (query.status) params.append('status', query.status);
    if (query.search) params.append('search', query.search);

    const response = await fetch(`${API_BASE_URL}/transactions?${params}`);

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return response.json();
  },

  async getTransaction(id: string): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch transaction');
    }

    return response.json();
  },
};
