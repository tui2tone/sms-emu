import { useState, useEffect, useCallback } from 'react';
import { Search, RefreshCcw, Download, MessageSquare } from 'lucide-react';
import type { Transaction } from '../types';
import { TransactionStatus } from '../types';
import { api } from '../services/api';

import { TransactionList } from './TransactionList';
import { TransactionFilters } from './TransactionFilters';

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState<TransactionStatus | undefined>();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.getTransactions({ page, limit, status, search });
      setTransactions(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, search]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await api.getTransactions({ page, limit, status, search });
      setPage(1);
    } catch (error) {
      console.error('Failed to refresh transactions:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleFilterChange = (newStatus: TransactionStatus | undefined) => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <h1 className="text-lg font-semibold text-slate-800">SMS Logs</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100 transition-colors ${isRefreshing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <RefreshCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
              {isRefreshing ? 'Syncing...' : 'Refresh Data'}
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <Download size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-6 sm:p-8">

          {/* Filters & Table Wrapper */}
          <div>
            {/* Toolbar */}
            <div className="p-5 border-b mb-5 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl border-x border-t border-slate-200">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search phone or message..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>

              <TransactionFilters
                selectedStatus={status}
                onStatusChange={handleFilterChange}
              />
            </div>

            {/* Table */}
            <TransactionList
              transactions={transactions}
              loading={loading}
              page={page}
              limit={limit}
              total={total}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
