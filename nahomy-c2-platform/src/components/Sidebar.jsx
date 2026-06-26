import { Shield, Activity, Server, FileText, Settings, LogOut, Wifi } from 'lucide-react'

const menuItems = [
  { icon: Activity, label: 'Dashboard', active: true },
  { icon: Server, label: 'Agentes' },
  { icon: FileText, label: 'Auditoría' },
  { icon: Settings, label: 'Configuración' },
]

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-64 bg-c2-surface border-r border-c2-border flex flex-col shrink-0">
      <div className="p-5 border-b border-c2-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-c2-accent/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-c2-accent" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-c2-text-bright leading-tight">Nahomy AI</h2>
            <p className="text-xs text-c2-text-dim">C2 Platform</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-c2-border space-y-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-c2-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-c2-green" />
          </span>
          <span className="text-c2-text-dim">Servidor:</span>
          <span className="text-c2-green font-medium">En Línea</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Wifi className="w-3.5 h-3.5 text-c2-accent" />
          <span className="text-c2-text-dim">Agentes Activos:</span>
          <span className="text-c2-text-bright font-mono font-medium">5</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Activity className="w-3.5 h-3.5 text-c2-amber" />
          <span className="text-c2-text-dim">Uptime:</span>
          <span className="text-c2-text-bright font-mono font-medium">72h 14m</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              item.active
                ? 'bg-c2-accent/10 text-c2-accent border border-c2-accent/20'
                : 'text-c2-text-dim hover:bg-c2-dark hover:text-c2-text-bright border border-transparent'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-c2-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-c2-text-dim hover:text-c2-red hover:bg-c2-red/5 transition-colors border border-transparent hover:border-c2-red/20"
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  )
}
