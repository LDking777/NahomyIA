const logs = [
  { date: '2026-06-26 10:23:45', user: 'analista01', action: 'Escaneo de puertos completado en 192.168.1.0/24', type: 'info' },
  { date: '2026-06-26 10:18:12', user: 'admin', action: 'Despliegue de agente en Linux-04 autorizado', type: 'success' },
  { date: '2026-06-26 10:12:33', user: 'sistema', action: 'Intento de acceso no autorizado bloqueado desde 45.33.22.11', type: 'error' },
  { date: '2026-06-26 10:05:07', user: 'analista02', action: 'Extracción de hashes completada en DC-01', type: 'info' },
  { date: '2026-06-26 09:58:44', user: 'analista01', action: 'Reconocimiento de red iniciado en segmento DMZ', type: 'warning' },
  { date: '2026-06-26 09:45:30', user: 'sistema', action: 'Actualización de reglas de firewall aplicada', type: 'info' },
  { date: '2026-06-26 09:30:15', user: 'admin', action: 'Nuevo agente Linux-05 registrado exitosamente', type: 'success' },
  { date: '2026-06-26 09:22:01', user: 'analista03', action: 'Captura de tráfico de red finalizada (2.3 GB)', type: 'info' },
]

const typeStyles = {
  info: 'bg-c2-accent/10 text-c2-accent border-c2-accent/20',
  success: 'bg-c2-green/10 text-c2-green border-c2-green/20',
  error: 'bg-c2-red/10 text-c2-red border-c2-red/20',
  warning: 'bg-c2-amber/10 text-c2-amber border-c2-amber/20',
}

export default function AuditLogsTable() {
  return (
    <div className="bg-c2-surface border border-c2-border rounded-xl">
      <div className="px-5 py-4 border-b border-c2-border">
        <h3 className="text-sm font-semibold text-c2-text-bright">
          Logs de Auditoría en Tiempo Real
        </h3>
        <p className="text-xs text-c2-text-dim mt-0.5">
          Últimas actividades registradas en el sistema
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-c2-border">
              <th className="text-left px-5 py-3 text-xs font-medium text-c2-text-dim uppercase tracking-wider">
                Fecha
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-c2-text-dim uppercase tracking-wider">
                Usuario
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-c2-text-dim uppercase tracking-wider">
                Acción
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium text-c2-text-dim uppercase tracking-wider">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-c2-border">
            {logs.map((log, i) => (
              <tr
                key={i}
                className="hover:bg-c2-dark/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <td className="px-5 py-3 font-mono text-xs text-c2-text-dim whitespace-nowrap">
                  {log.date}
                </td>
                <td className="px-5 py-3 text-c2-text-bright font-medium whitespace-nowrap">
                  {log.user}
                </td>
                <td className="px-5 py-3 text-c2-text">{log.action}</td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${typeStyles[log.type]}`}
                  >
                    {log.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
