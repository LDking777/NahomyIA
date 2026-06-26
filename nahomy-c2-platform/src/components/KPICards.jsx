import { Gauge, Database, Bot, TrendingUp } from 'lucide-react'

const kpis = [
  {
    icon: Gauge,
    label: 'Tiempo de Respuesta Promedio',
    value: '450 ms',
    change: '+12%',
    positive: false,
  },
  {
    icon: Database,
    label: 'Bytes Transferidos Totales',
    value: '24.5 MB',
    change: '+8.3%',
    positive: true,
  },
  {
    icon: Bot,
    label: 'Última Intención Automatizada',
    value: 'Reconocimiento del Sistema',
    change: 'Ejecutado',
    positive: true,
  },
  {
    icon: TrendingUp,
    label: 'Paquetes Analizados',
    value: '12,847',
    change: '+23%',
    positive: true,
  },
]

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon
        return (
          <div
            key={i}
            className="bg-c2-surface border border-c2-border rounded-xl p-4 hover:border-c2-accent/30 transition-colors animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-c2-accent/10 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-c2-accent" />
              </div>
              <span
                className={`text-xs font-mono font-medium px-2 py-0.5 rounded-full ${
                  kpi.positive
                    ? 'bg-c2-green/10 text-c2-green'
                    : 'bg-c2-red/10 text-c2-red'
                }`}
              >
                {kpi.change}
              </span>
            </div>
            <p className="text-c2-text-dim text-xs mb-0.5">{kpi.label}</p>
            <p className="text-lg font-bold text-c2-text-bright font-mono tracking-tight">
              {kpi.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}
