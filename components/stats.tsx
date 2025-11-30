interface StatsProps {
  completed: number
  total: number
}

export default function Stats({ completed, total }: StatsProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 p-6 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/80 transition-shadow">
        <div className="text-4xl font-bold text-blue-600 mb-1">{total}</div>
        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Tasks</div>
      </div>
      <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 p-6 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/80 transition-shadow">
        <div className="text-4xl font-bold text-emerald-600 mb-1">{completed}</div>
        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Completed</div>
      </div>
      <div className="bg-white rounded-xl shadow-md shadow-slate-200/50 p-6 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/80 transition-shadow">
        <div className="text-4xl font-bold text-indigo-600 mb-1">{percentage}%</div>
        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Progress</div>
      </div>
    </div>
  )
}
