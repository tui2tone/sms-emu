import React from 'react';
import { MessageSquare, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

function StatCard({ label, value, icon: Icon, color, bg }: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${bg}`}>
        <Icon size={20} className={color} />
      </div>
    </div>
  );
}

interface StatsCardsProps {
  total: number;
  delivered: number;
  pending: number;
  failed: number;
}

export function StatsCards({ total, delivered, pending, failed }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Total Messages"
        value={total}
        icon={MessageSquare}
        color="text-indigo-600"
        bg="bg-indigo-50"
      />
      <StatCard
        label="Delivered"
        value={delivered}
        icon={CheckCircle2}
        color="text-emerald-600"
        bg="bg-emerald-50"
      />
      <StatCard
        label="Pending"
        value={pending}
        icon={Clock}
        color="text-amber-600"
        bg="bg-amber-50"
      />
      <StatCard
        label="Failed"
        value={failed}
        icon={AlertCircle}
        color="text-rose-600"
        bg="bg-rose-50"
      />
    </div>
  );
}
