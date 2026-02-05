import { ChevronLeft, ChevronRight, Clock, CheckCircle2, AlertCircle, Smartphone, Calendar, Search } from 'lucide-react';
import type { Transaction } from '../types';
import { TransactionStatus } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

const getStatusColor = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.Delivered: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case TransactionStatus.Pending: return 'bg-amber-100 text-amber-700 border-amber-200';
    case TransactionStatus.Failed: return 'bg-rose-100 text-rose-700 border-rose-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const getStatusIcon = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.Delivered: return <CheckCircle2 className="w-3 h-3 mr-1.5" />;
    case TransactionStatus.Pending: return <Clock className="w-3 h-3 mr-1.5" />;
    case TransactionStatus.Failed: return <AlertCircle className="w-3 h-3 mr-1.5" />;
    default: return null;
  }
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(date);
};

export function TransactionList({ transactions, loading, page, limit, total, onPageChange }: TransactionListProps) {
  const totalPages = Math.ceil(total / limit);
  const startIndex = total > 0 ? (page - 1) * limit + 1 : 0;
  const endIndex = Math.min(page * limit, total);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[600px] overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <div className="col-span-3 flex items-center gap-2">
          <Smartphone size={14} /> Phone
        </div>
        <div className="col-span-5">Message</div>
        <div className="col-span-2 flex items-center gap-2">
          <Calendar size={14} /> Timestamp
        </div>
        <div className="col-span-2 text-center">Status</div>
      </div>

      {/* Table Body (Scrollable) */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-sm">Loading transactions...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
            <Search size={32} className="opacity-20" />
            <p className="text-sm">No transactions found matching your criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors group">
                {/* Phone */}
                <div className="col-span-3 font-mono text-sm text-slate-700 font-medium truncate">
                  {tx.phone}
                </div>

                {/* Message */}
                <div className="col-span-5 pr-4">
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {tx.message}
                  </p>
                </div>

                {/* Timestamp */}
                <div className="col-span-2 text-sm text-slate-500 whitespace-nowrap">
                  {formatDate(tx.timestamp)}
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(tx.status)}`}>
                    {getStatusIcon(tx.status)}
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-800">{startIndex}</span> to <span className="font-medium text-slate-800">{endIndex}</span> of <span className="font-medium text-slate-800">{total}</span> results
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="p-2 rounded-md hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-slate-600"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && page > 3) {
                  pageNum = page - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }

                if (pageNum <= 0 || pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="p-2 rounded-md hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-slate-600"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
