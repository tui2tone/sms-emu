import { Filter } from 'lucide-react';
import { TransactionStatus } from '../types';

interface TransactionFiltersProps {
  selectedStatus: TransactionStatus | undefined;
  onStatusChange: (status: TransactionStatus | undefined) => void;
}

export function TransactionFilters({ selectedStatus, onStatusChange }: TransactionFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-slate-50">
        <Filter size={16} className="text-slate-500" />
        <select
          className="bg-transparent border-none text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
          value={selectedStatus ?? 'All'}
          onChange={(e) => {
            const value = e.target.value;
            onStatusChange(value === 'All' ? undefined : (value as TransactionStatus));
          }}
        >
          <option value="All">All Statuses</option>
          <option value={TransactionStatus.Delivered}>Delivered</option>
          <option value={TransactionStatus.Pending}>Pending</option>
          <option value={TransactionStatus.Failed}>Failed</option>
        </select>
      </div>
    </div>
  );
}
