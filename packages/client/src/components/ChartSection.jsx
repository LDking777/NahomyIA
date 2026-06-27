import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', incoming: 240, outgoing: 180 },
  { time: '04:00', incoming: 320, outgoing: 210 },
  { time: '08:00', incoming: 580, outgoing: 390 },
  { time: '12:00', incoming: 690, outgoing: 450 },
  { time: '16:00', incoming: 520, outgoing: 340 },
  { time: '20:00', incoming: 380, outgoing: 250 },
  { time: '23:59', incoming: 300, outgoing: 200 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-c2-surface border border-c2-border rounded-lg px-3 py-2 text-xs shadow-xl">
        <p className="text-c2-text-dim mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }} className="font-mono font-medium">
            {entry.name}: {entry.value} Mbps
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ChartSection() {
  return (
    <div className="bg-c2-surface border border-c2-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-c2-text-bright">
            Tráfico de Red
          </h3>
          <p className="text-xs text-c2-text-dim mt-0.5">
            Últimas 24 horas (Mbps)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
            <span className="text-c2-text-dim">Entrante</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-green-500" />
            <span className="text-c2-text-dim">Saliente</span>
          </div>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2a" />
            <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="incoming" stroke="#00d4ff" fill="url(#colorIncoming)" strokeWidth={2} name="Entrante" />
            <Area type="monotone" dataKey="outgoing" stroke="#22c55e" fill="url(#colorOutgoing)" strokeWidth={2} name="Saliente" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
